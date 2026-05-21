import type { Product } from '@/data/products';
import type { Category } from '@/data/categories';

/**
 * ДИНАМИЧЕСКАЯ СИСТЕМА ХАРАКТЕРИСТИК ТОВАРА.
 *
 * Характеристики НЕ заданы вручную для каждого товара. Они вычисляются
 * из имеющихся данных:
 *   - product.name  (марка, диаметр, сечение, цвет RAL, толщина …)
 *   - product.size  (длина / размер листа / рулона)
 *   - product.unit  (единица измерения)
 *   - category.parentSlug / category.name  (таксономия → класс, тип, ГОСТ, поверхность)
 *
 * Набор характеристик выбирается по группе категории (category.parentSlug).
 * Для неизвестных групп — универсальный fallback. Любой товар получает
 * непустую таблицу: пустые/нераспознанные значения в таблицу не попадают.
 */

export interface Spec {
  label: string;
  value: string;
}

/* ── helpers ─────────────────────────────────────────────────── */

const EMPTY = /^(—|-|\\|\s)*$/;

function clean(v?: string): string {
  const s = (v ?? '').replace(/\s+/g, ' ').trim();
  return EMPTY.test(s) ? '' : s;
}

/** Десятичную точку → запятую (русская типографика чисел). */
function ruNum(s: string): string {
  return s.replace(/(\d)\.(\d)/g, '$1,$2');
}

/** Длина / размер из product.size («6 м», «1,25х2,5 м», «6-11,7 м»). */
function sizeValue(size: string): string {
  return ruNum(clean(size).replace(/[хx]/gi, '×'));
}

/** Первое значение «N мм» в строке (диаметр / толщина). */
function firstMm(name: string): string | null {
  const m = name.match(/(\d+(?:[.,]\d+)?)\s*мм/i);
  return m ? m[1].replace('.', ',') : null;
}

/** Числа из габаритного токена AхB(хC) — кириллическая «х» или латинская «x». */
function dims(name: string): string[] | null {
  const m = name.match(
    /(\d+(?:[.,]\d+)?)\s*[хx]\s*(\d+(?:[.,]\d+)?)(?:\s*[хx]\s*(\d+(?:[.,]\d+)?))?/i,
  );
  if (!m) return null;
  return [m[1], m[2], m[3]].filter(Boolean).map((n) => n.replace('.', ',')) as string[];
}

function ral(name: string): string | null {
  const m = name.match(/RAL\s*(\d{3,4})/i);
  return m ? `RAL ${m[1]}` : null;
}

/** Цвет в скобках: «(Шоколадно-коричневый)». */
function colorWord(name: string): string | null {
  const m = name.match(/\(([^)]+)\)/);
  return m ? m[1].trim() : null;
}

/** Номер профиля проката: «№ 5», «№ 6.5». */
function profileNo(name: string): string | null {
  const m = name.match(/№\s*([\d.,]+)/);
  return m ? m[1].replace('.', ',') : null;
}

/** Расчётная погонная масса арматуры: m = 0,00617 · d² (кг/м). */
function rebarWeight(diameterMm: string): string | null {
  const d = parseFloat(diameterMm.replace(',', '.'));
  if (!Number.isFinite(d) || d <= 0) return null;
  return `${(0.00617 * d * d).toFixed(3).replace('.', ',')} кг/м`;
}

function push(out: Spec[], label: string, value: string) {
  const v = clean(value);
  if (v) out.push({ label, value: v });
}

/* ── builders по группам ─────────────────────────────────────── */

function buildArmatura(p: Product, c?: Category): Spec[] {
  const out: Spec[] = [];
  const slug = c?.slug ?? '';
  const name = p.name;
  const d = firstMm(name) ?? (dims(name)?.[0] ?? null);

  if (slug === 'kompozitnaya') {
    if (d) push(out, 'Диаметр', `${d} мм`);
    push(out, 'Длина', sizeValue(p.size));
    push(out, 'Материал', 'Композит (стеклопластик)');
    push(out, 'Поверхность', 'Периодический профиль');
    push(out, 'ГОСТ', 'ГОСТ 31938-2012');
    return out;
  }

  const isGladkaya = slug === 'gladkaya-a1' || /гладк/i.test(name) || /А-?1/.test(name);
  if (d) push(out, 'Диаметр', `${d} мм`);
  push(out, 'Длина', sizeValue(p.size));
  if (d) push(out, 'Вес (1 м)', rebarWeight(d) ?? '');
  push(out, 'Класс арматуры', isGladkaya ? 'А240 (А-I)' : 'А500С (А-III)');
  push(out, 'Поверхность', isGladkaya ? 'Гладкая' : 'Рифлёная (периодический профиль)');
  push(out, 'Класс прочности', isGladkaya ? '240 МПа' : '500 МПа');
  push(out, 'Марка стали', isGladkaya ? 'Ст3сп/пс' : 'Ст3сп, 35ГС');
  push(out, 'ГОСТ', 'ГОСТ 34028-2016');
  return out;
}

function buildTruby(p: Product, c?: Category): Spec[] {
  const out: Spec[] = [];
  const slug = c?.slug ?? '';
  const d = dims(p.name);
  const isProfile = slug.startsWith('profilnaya');

  if (isProfile && d && d.length >= 2) {
    push(out, 'Сечение', `${d[0]}×${d[1]} мм`);
    if (d[2]) push(out, 'Толщина стенки', `${d[2]} мм`);
  } else if (d && d.length >= 2) {
    push(out, 'Диаметр', `${d[0]} мм`);
    push(out, 'Толщина стенки', `${d[1]} мм`);
  } else {
    const mm = firstMm(p.name);
    if (mm) push(out, 'Диаметр', `${mm} мм`);
  }
  push(out, 'Длина', sizeValue(p.size));
  push(out, 'Тип трубы', c?.name ?? 'Стальная');
  if (slug.includes('ocinkovannaya')) push(out, 'Покрытие', 'Цинковое');
  push(out, 'Марка стали', 'Ст3сп/пс, 2пс');

  const gost = slug === 'vgp' || slug === 'ocinkovannaya-vgp'
    ? 'ГОСТ 3262-75'
    : slug === 'elektrosvarnaya'
      ? 'ГОСТ 10704-91'
      : 'ГОСТ 8639-82 / 30245-2003';
  push(out, 'ГОСТ', gost);
  return out;
}

function buildList(p: Product, c?: Category): Spec[] {
  const out: Spec[] = [];
  const slug = c?.slug ?? '';
  const thickness = firstMm(p.name) ?? profileNo(p.name);
  if (thickness) push(out, 'Толщина', `${thickness} мм`);
  push(out, 'Размер листа', sizeValue(p.size));

  const surface =
    slug === 'goryachekatanyy' ? 'Горячекатаная'
    : slug === 'holodnokatanyy' ? 'Холоднокатаная'
    : slug === 'ocinkovannyy' ? 'Оцинкованная'
    : slug === 'riflenyy' ? 'Рифлёная'
    : 'Гладкая';
  push(out, 'Тип поверхности', surface);
  push(out, 'Марка стали', 'Ст3сп/пс');

  const gost =
    slug === 'goryachekatanyy' ? 'ГОСТ 19903-2015'
    : slug === 'holodnokatanyy' ? 'ГОСТ 19904-90'
    : slug === 'ocinkovannyy' ? 'ГОСТ 14918-2020'
    : slug === 'riflenyy' ? 'ГОСТ 8568-77'
    : 'ГОСТ 19903-2015';
  push(out, 'ГОСТ', gost);
  return out;
}

function buildProfnastil(p: Product): Spec[] {
  const out: Spec[] = [];
  // Кириллическая С/Н или латинская C/H + число (\b в JS не работает с кириллицей).
  const mark = p.name.match(/(?:^|\s)([СCНH])\s?(\d{1,3})(?=\s|,|$)/);
  if (mark) push(out, 'Марка профиля', `${mark[1]}${mark[2]}`);
  const color = [ral(p.name), colorWord(p.name)].filter(Boolean).join(', ');
  push(out, 'Цвет', color);
  const th = firstMm(p.name);
  if (th) push(out, 'Толщина', `${th} мм`);
  push(out, 'Размер листа', sizeValue(p.size));
  push(out, 'Покрытие', /оцинк/i.test(p.name) && !ral(p.name) ? 'Оцинкованное' : 'Полимерное (RAL)');
  push(out, 'ГОСТ', 'ГОСТ 24045-2016');
  return out;
}

function buildSortovoy(p: Product, c?: Category): Spec[] {
  const out: Spec[] = [];
  const slug = c?.slug ?? '';
  const d = dims(p.name);

  if (slug === 'shveller' || slug === 'dvutavrovaya-balka') {
    const no = profileNo(p.name);
    if (no) push(out, 'Номер профиля', `№ ${no}`);
    push(out, 'Длина', sizeValue(p.size));
    push(out, 'Марка стали', 'Ст3сп/пс');
    push(out, 'ГОСТ', slug === 'shveller' ? 'ГОСТ 8240-97' : 'ГОСТ 8239-89 / 26020-83');
    return out;
  }
  if (slug === 'ugolok' && d && d.length >= 2) {
    push(out, 'Размер полок', `${d[0]}×${d[1]} мм`);
    if (d[2]) push(out, 'Толщина', `${d[2]} мм`);
    push(out, 'Длина', sizeValue(p.size));
    push(out, 'Марка стали', 'Ст3сп/пс');
    push(out, 'ГОСТ', 'ГОСТ 8509-93');
    return out;
  }
  // kvadrat / polosa / прочее сортовое
  if (d && d.length >= 2) push(out, 'Сечение', `${d[0]}×${d[1]} мм`);
  else {
    const mm = firstMm(p.name) ?? profileNo(p.name);
    if (mm) push(out, 'Размер', `${mm} мм`);
  }
  push(out, 'Длина', sizeValue(p.size));
  push(out, 'Марка стали', 'Ст3сп/пс');
  push(out, 'ГОСТ', slug === 'kvadrat' ? 'ГОСТ 2591-2006' : slug === 'polosa' ? 'ГОСТ 103-2006' : 'ГОСТ 535-2005');
  return out;
}

function buildSetka(p: Product): Spec[] {
  const out: Spec[] = [];
  const d = dims(p.name); // ячейка AхB, проволока C
  if (d && d.length >= 2) push(out, 'Размер ячейки', `${d[0]}×${d[1]} мм`);
  if (d && d[2]) push(out, 'Диаметр проволоки', `${d[2]} мм`);
  const roll = p.name.match(/\(([\d.,]+\s*[хx]\s*[\d.,]+\s*м?)\)/i);
  if (roll) push(out, 'Размер карты/рулона', ruNum(roll[1].replace(/[хx]/gi, '×')));
  push(out, 'Длина', sizeValue(p.size));
  push(out, 'Покрытие', /оцинк/i.test(p.name) ? 'Оцинкованная' : 'Без покрытия');
  push(out, 'ГОСТ', /рабиц/i.test(p.name) ? 'ГОСТ 5336-80' : 'ГОСТ 23279-2012');
  return out;
}

function buildShtaketnik(p: Product): Spec[] {
  const out: Spec[] = [];
  const profile = p.name.match(/(Полукруглый|П-?образный|М-?образный|Прямой|Трапеция)/i);
  if (profile) push(out, 'Профиль', profile[1]);
  const color = [ral(p.name), colorWord(p.name)].filter(Boolean).join(', ');
  push(out, 'Цвет', color);
  const d = dims(p.name); // ширина×толщина: 105х0,45
  if (d && d.length >= 2) {
    push(out, 'Ширина', `${d[0]} мм`);
    push(out, 'Толщина', `${d[1]} мм`);
  }
  const side = p.name.match(/(двухсторонн|односторонн)\w*/i);
  if (side) push(out, 'Покрытие', /двух/i.test(side[0]) ? 'Двустороннее' : 'Одностороннее');
  const len = p.name.match(/([\d.,]+)\s*м\.?\s*$/);
  if (len) push(out, 'Длина', `${len[1].replace('.', ',')} м`);
  push(out, 'Материал', 'Сталь оцинкованная с полимерным покрытием');
  return out;
}

function buildSvai(p: Product, c?: Category): Spec[] {
  const out: Spec[] = [];
  if ((c?.slug ?? '') === 'vintovye-svai') {
    const d = dims(p.name); // 57х3
    if (d && d.length >= 2) {
      push(out, 'Диаметр ствола', `${d[0]} мм`);
      push(out, 'Толщина стенки', `${d[1]} мм`);
    }
    const len = p.name.match(/длина\s*([\d.,]+)\s*м/i);
    push(out, 'Длина', len ? `${len[1].replace('.', ',')} м` : sizeValue(p.size));
    push(out, 'Покрытие', 'Грунтовка / горячее цинкование');
    push(out, 'ГОСТ', 'ГОСТ Р 59542-2021');
    return out;
  }
  return buildFallback(p, c);
}

function buildFallback(p: Product, c?: Category): Spec[] {
  const out: Spec[] = [];
  push(out, 'Тип проката', c?.parentName ?? 'Металлопрокат');
  if (c?.name) push(out, 'Вид', c.name);
  const mm = firstMm(p.name);
  if (mm) push(out, 'Размер', `${mm} мм`);
  push(out, 'Размер / длина', sizeValue(p.size));
  push(out, 'Единица измерения', clean(p.unit));
  push(out, 'Соответствие', 'ГОСТ');
  return out;
}

/* ── public API ──────────────────────────────────────────────── */

const BUILDERS: Record<string, (p: Product, c?: Category) => Spec[]> = {
  armatura: buildArmatura,
  truby: buildTruby,
  'listovoy-prokat': buildList,
  profnastil: buildProfnastil,
  'sortovoy-prokat': buildSortovoy,
  setka: buildSetka,
  shtaketnik: buildShtaketnik,
  'fundament-i-svai': buildSvai,
};

/**
 * Главная функция: характеристики товара по его категории.
 * Гарантирует непустой результат (fallback при неизвестной группе).
 */
export function getProductSpecs(product: Product, category?: Category): Spec[] {
  const builder = category ? BUILDERS[category.parentSlug] : undefined;
  const specs = (builder ? builder(product, category) : buildFallback(product, category)).filter(
    (s) => clean(s.value),
  );
  return specs.length > 0 ? specs : buildFallback(product, category);
}

/** Марка стали из вычисленных характеристик — для Product schema (material). */
export function getMaterial(specs: Spec[]): string | undefined {
  return specs.find((s) => s.label === 'Марка стали' || s.label === 'Материал')?.value;
}
