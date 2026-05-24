// Единый маппинг slug → путь к изображению для категорий и групп
export const categoryImages: Record<string, string> = {
  // ── Арматура ──────────────────────────────────────────────────────────────
  'riflenaya-a3-500s':    '/images/categories/armatura/armatura_riflenaya.webp',
  'gladkaya-a1':          '/images/categories/armatura/armatura_gladkaya.webp',
  'kompozitnaya':         '/images/categories/armatura/armatura_kompozitnaya.webp',
  'armatura':             '/images/categories/armatura/armatura_riflenaya.webp',

  // ── Трубы ─────────────────────────────────────────────────────────────────
  'profilnaya-kvadratnaya':    '/images/categories/truba/profilnaya_truba_kvadratnogo_secheniya.webp',
  'profilnaya-pryamougolnaya': '/images/categories/truba/profilnaya_truba_pryamougolnogo_secheniya.webp',
  'vgp':                       '/images/categories/truba/truba_vodogazoprovodnaya.webp',
  'elektrosvarnaya':           '/images/categories/truba/truba_elektrosvarnaya.webp',
  'ocinkovannaya-vgp':         '/images/categories/truba/truba_otsinkovannaya_vodogazoprovodnaya.webp',
  'truby':                     '/images/categories/truba/profilnaya_truba_kvadratnogo_secheniya.webp',

  // ── Профнастил ────────────────────────────────────────────────────────────
  's8':         '/images/categories/profnastil/profnastil.webp',
  's20':        '/images/categories/profnastil/profnastil.webp',
  'n75':        '/images/categories/profnastil/profnastil_otsinkovannyy.webp',
  'profnastil': '/images/categories/profnastil/profnastil.webp',

  // ── Листовой прокат ───────────────────────────────────────────────────────
  'goryachekatanyy': '/images/categories/listovoy_prokat/list_goryachekatanyy.webp',
  'holodnokatanyy':  '/images/categories/listovoy_prokat/list_kholodnokatanyy.webp',
  'ocinkovannyy':    '/images/categories/listovoy_prokat/list_otsinkovannyy.webp',
  'riflenyy':        '/images/categories/listovoy_prokat/list_riflenyy.webp',
  'listovoy-prokat': '/images/categories/listovoy_prokat/list_goryachekatanyy.webp',

  // ── Сортовой прокат ───────────────────────────────────────────────────────
  'shveller':           '/images/categories/sortovoy_prokat/shveller.webp',
  'dvutavrovaya-balka': '/images/categories/sortovoy_prokat/dvutavrovaya_balka.webp',
  'ugolok':             '/images/categories/sortovoy_prokat/ugolok_stalnoy.webp',
  'kvadrat':            '/images/categories/sortovoy_prokat/kvadrat_metallicheskiy.webp',
  'polosa':             '/images/categories/sortovoy_prokat/metallicheskaya_polosa.webp',
  'sortovoy-prokat':    '/images/categories/sortovoy_prokat/shveller.webp',

  // ── Сетка ─────────────────────────────────────────────────────────────────
  'rabica':             '/images/categories/setka/setka_rabitsa.webp',
  'svarnaya-v-rulonah': '/images/categories/setka/setka_svarnaya_v_rulonakh.webp',
  'svarnaya-v-kartah':  '/images/categories/setka/setka_svarnaya_v_kartakh.webp',
  'setka':              '/images/categories/setka/setka_rabitsa.webp',

  // ── Штакетник ─────────────────────────────────────────────────────────────
  'shtaketnik': '/images/categories/shtaketnik/shtaketnik.webp',

  // ── Арматурные изделия ────────────────────────────────────────────────────
  'fiksatory':           '/images/categories/armaturnye_izdeliya/fiksatory_armatury.webp',
  'lyagushki':           '/images/categories/armaturnye_izdeliya/lyagushki.webp',
  'peshki':              '/images/categories/armaturnye_izdeliya/peshki.webp',
  'provoloka-ok':        '/images/categories/armaturnye_izdeliya/provoloka.webp',
  'armaturnye-izdeliya': '/images/categories/armaturnye_izdeliya/fiksatory_armatury.webp',

  // ── Фундамент и сваи ──────────────────────────────────────────────────────
  'stroymaterialy':      '/images/categories/fundament_i_svayi/stroymaterialy.webp',
  'vintovye-svai':       '/images/categories/fundament_i_svayi/vintovye_svayi.webp',
  'zaglushki-dlya-trub': '/images/categories/fundament_i_svayi/zaglushki_dlya_trub.webp',
  'fundament-i-svai':    '/images/categories/fundament_i_svayi/stroymaterialy.webp',

  // ── Фитинги и петли ───────────────────────────────────────────────────────
  'fitingi':          '/images/categories/fitingi_i_petli/fitingi.webp',
  'petli-dlya-vorot': '/images/categories/fitingi_i_petli/petli.webp',
  'fitingi-i-petli':  '/images/categories/fitingi_i_petli/fitingi.webp',
};

export function getCategoryImage(slug: string, parentSlug?: string): string | undefined {
  return categoryImages[slug] ?? (parentSlug ? categoryImages[parentSlug] : undefined);
}

/** Запасной placeholder, если у категории нет изображения. */
export const PRODUCT_PLACEHOLDER = '/images/product-placeholder.webp';

/**
 * Изображение товара: фото категории товара (с откатом на родительскую группу),
 * иначе — брендированный placeholder. Гарантирует валидную, не битую картинку
 * на странице товара, в карточках и в Product schema.
 */
export function getProductImage(categorySlug: string, parentSlug?: string): string {
  return getCategoryImage(categorySlug, parentSlug) ?? PRODUCT_PLACEHOLDER;
}
