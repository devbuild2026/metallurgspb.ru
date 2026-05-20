// Единый маппинг slug → путь к изображению для категорий и групп
export const categoryImages: Record<string, string> = {
  // ── Арматура ──────────────────────────────────────────────────────────────
  'riflenaya-a3-500s':    '/images/categories/armatura/armatura_riflenaya.png',
  'gladkaya-a1':          '/images/categories/armatura/armatura_gladkaya.png',
  'kompozitnaya':         '/images/categories/armatura/armatura_kompozitnaya.png',
  'armatura':             '/images/categories/armatura/armatura_riflenaya.png',

  // ── Трубы ─────────────────────────────────────────────────────────────────
  'profilnaya-kvadratnaya':    '/images/categories/truba/profilnaya_truba_kvadratnogo_secheniya.png',
  'profilnaya-pryamougolnaya': '/images/categories/truba/profilnaya_truba_pryamougolnogo_secheniya.png',
  'vgp':                       '/images/categories/truba/truba_vodogazoprovodnaya.png',
  'elektrosvarnaya':           '/images/categories/truba/truba_elektrosvarnaya.png',
  'ocinkovannaya-vgp':         '/images/categories/truba/truba_otsinkovannaya_vodogazoprovodnaya.png',
  'truby':                     '/images/categories/truba/profilnaya_truba_kvadratnogo_secheniya.png',

  // ── Профнастил ────────────────────────────────────────────────────────────
  's8':         '/images/categories/profnastil/profnastil.png',
  's20':        '/images/categories/profnastil/profnastil.png',
  'n75':        '/images/categories/profnastil/profnastil_otsinkovannyy.png',
  'profnastil': '/images/categories/profnastil/profnastil.png',

  // ── Листовой прокат ───────────────────────────────────────────────────────
  'goryachekatanyy': '/images/categories/listovoy_prokat/list_goryachekatanyy.png',
  'holodnokatanyy':  '/images/categories/listovoy_prokat/list_kholodnokatanyy.png',
  'ocinkovannyy':    '/images/categories/listovoy_prokat/list_otsinkovannyy.png',
  'riflenyy':        '/images/categories/listovoy_prokat/list_riflenyy.png',
  'listovoy-prokat': '/images/categories/listovoy_prokat/list_goryachekatanyy.png',

  // ── Сортовой прокат ───────────────────────────────────────────────────────
  'shveller':           '/images/categories/sortovoy_prokat/shveller.png',
  'dvutavrovaya-balka': '/images/categories/sortovoy_prokat/dvutavrovaya_balka.png',
  'ugolok':             '/images/categories/sortovoy_prokat/ugolok_stalnoy.png',
  'kvadrat':            '/images/categories/sortovoy_prokat/kvadrat_metallicheskiy.png',
  'polosa':             '/images/categories/sortovoy_prokat/metallicheskaya_polosa.png',
  'sortovoy-prokat':    '/images/categories/sortovoy_prokat/shveller.png',

  // ── Сетка ─────────────────────────────────────────────────────────────────
  'rabica':             '/images/categories/setka/setka_rabitsa.png',
  'svarnaya-v-rulonah': '/images/categories/setka/setka_svarnaya_v_rulonakh.png',
  'svarnaya-v-kartah':  '/images/categories/setka/setka_svarnaya_v_kartakh.png',
  'setka':              '/images/categories/setka/setka_rabitsa.png',

  // ── Штакетник ─────────────────────────────────────────────────────────────
  'shtaketnik': '/images/categories/shtaketnik/shtaketnik.png',

  // ── Арматурные изделия ────────────────────────────────────────────────────
  'fiksatory':           '/images/categories/armaturnye_izdeliya/fiksatory_armatury.png',
  'lyagushki':           '/images/categories/armaturnye_izdeliya/lyagushki.png',
  'peshki':              '/images/categories/armaturnye_izdeliya/peshki.png',
  'provoloka-ok':        '/images/categories/armaturnye_izdeliya/provoloka.png',
  'armaturnye-izdeliya': '/images/categories/armaturnye_izdeliya/fiksatory_armatury.png',

  // ── Фундамент и сваи ──────────────────────────────────────────────────────
  'stroymaterialy':      '/images/categories/fundament_i_svayi/stroymaterialy.png',
  'vintovye-svai':       '/images/categories/fundament_i_svayi/vintovye_svayi.png',
  'zaglushki-dlya-trub': '/images/categories/fundament_i_svayi/zaglushki_dlya_trub.png',
  'fundament-i-svai':    '/images/categories/fundament_i_svayi/stroymaterialy.png',

  // ── Фитинги и петли ───────────────────────────────────────────────────────
  'fitingi':          '/images/categories/fitingi_i_petli/fitingi.png',
  'petli-dlya-vorot': '/images/categories/fitingi_i_petli/petli.png',
  'fitingi-i-petli':  '/images/categories/fitingi_i_petli/fitingi.png',
};

export function getCategoryImage(slug: string, parentSlug?: string): string | undefined {
  return categoryImages[slug] ?? (parentSlug ? categoryImages[parentSlug] : undefined);
}
