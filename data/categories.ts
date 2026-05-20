export interface Category {
  id: number;
  slug: string;
  name: string;
  parentSlug: string;
  parentName: string;
}

export interface CategoryGroup {
  id: number;
  slug: string;
  name: string;
  children: Category[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    "id": 1,
    "slug": "armatura",
    "name": "Арматура",
    "children": [
      {
        "id": 1,
        "slug": "riflenaya-a3-500s",
        "name": "Рифленая А-3 500С",
        "parentSlug": "armatura",
        "parentName": "Арматура"
      },
      {
        "id": 2,
        "slug": "gladkaya-a1",
        "name": "Гладкая А-1",
        "parentSlug": "armatura",
        "parentName": "Арматура"
      },
      {
        "id": 3,
        "slug": "nd",
        "name": "Н/Д",
        "parentSlug": "armatura",
        "parentName": "Арматура"
      },
      {
        "id": 4,
        "slug": "kompozitnaya",
        "name": "Композитная",
        "parentSlug": "armatura",
        "parentName": "Арматура"
      }
    ]
  },
  {
    "id": 2,
    "slug": "truby",
    "name": "Трубы",
    "children": [
      {
        "id": 5,
        "slug": "profilnaya-kvadratnaya",
        "name": "Профильная квадратная",
        "parentSlug": "truby",
        "parentName": "Трубы"
      },
      {
        "id": 6,
        "slug": "profilnaya-pryamougolnaya",
        "name": "Профильная прямоугольная",
        "parentSlug": "truby",
        "parentName": "Трубы"
      },
      {
        "id": 7,
        "slug": "vgp",
        "name": "ВГП",
        "parentSlug": "truby",
        "parentName": "Трубы"
      },
      {
        "id": 8,
        "slug": "elektrosvarnaya",
        "name": "Электросварная",
        "parentSlug": "truby",
        "parentName": "Трубы"
      },
      {
        "id": 9,
        "slug": "ocinkovannaya-vgp",
        "name": "Оцинкованная ВГП",
        "parentSlug": "truby",
        "parentName": "Трубы"
      }
    ]
  },
  {
    "id": 3,
    "slug": "profnastil",
    "name": "Профнастил",
    "children": [
      {
        "id": 10,
        "slug": "s8",
        "name": "С8",
        "parentSlug": "profnastil",
        "parentName": "Профнастил"
      },
      {
        "id": 11,
        "slug": "s20",
        "name": "С20",
        "parentSlug": "profnastil",
        "parentName": "Профнастил"
      },
      {
        "id": 12,
        "slug": "n75",
        "name": "Н75",
        "parentSlug": "profnastil",
        "parentName": "Профнастил"
      }
    ]
  },
  {
    "id": 4,
    "slug": "listovoy-prokat",
    "name": "Листовой прокат",
    "children": [
      {
        "id": 13,
        "slug": "goryachekatanyy",
        "name": "Горячекатаный",
        "parentSlug": "listovoy-prokat",
        "parentName": "Листовой прокат"
      },
      {
        "id": 14,
        "slug": "holodnokatanyy",
        "name": "Холоднокатаный",
        "parentSlug": "listovoy-prokat",
        "parentName": "Листовой прокат"
      },
      {
        "id": 15,
        "slug": "ocinkovannyy",
        "name": "Оцинкованный",
        "parentSlug": "listovoy-prokat",
        "parentName": "Листовой прокат"
      },
      {
        "id": 16,
        "slug": "riflenyy",
        "name": "Рифленый",
        "parentSlug": "listovoy-prokat",
        "parentName": "Листовой прокат"
      }
    ]
  },
  {
    "id": 5,
    "slug": "sortovoy-prokat",
    "name": "Сортовой прокат",
    "children": [
      {
        "id": 17,
        "slug": "shveller",
        "name": "Швеллер",
        "parentSlug": "sortovoy-prokat",
        "parentName": "Сортовой прокат"
      },
      {
        "id": 18,
        "slug": "dvutavrovaya-balka",
        "name": "Двутавровая балка",
        "parentSlug": "sortovoy-prokat",
        "parentName": "Сортовой прокат"
      },
      {
        "id": 19,
        "slug": "ugolok",
        "name": "Уголок",
        "parentSlug": "sortovoy-prokat",
        "parentName": "Сортовой прокат"
      },
      {
        "id": 20,
        "slug": "kvadrat",
        "name": "Квадрат",
        "parentSlug": "sortovoy-prokat",
        "parentName": "Сортовой прокат"
      },
      {
        "id": 21,
        "slug": "polosa",
        "name": "Полоса",
        "parentSlug": "sortovoy-prokat",
        "parentName": "Сортовой прокат"
      }
    ]
  },
  {
    "id": 6,
    "slug": "setka",
    "name": "Сетка",
    "children": [
      {
        "id": 22,
        "slug": "rabica",
        "name": "Рабица",
        "parentSlug": "setka",
        "parentName": "Сетка"
      },
      {
        "id": 23,
        "slug": "svarnaya-v-rulonah",
        "name": "Сварная в рулонах",
        "parentSlug": "setka",
        "parentName": "Сетка"
      },
      {
        "id": 24,
        "slug": "svarnaya-v-kartah",
        "name": "Сварная в картах",
        "parentSlug": "setka",
        "parentName": "Сетка"
      }
    ]
  },
  {
    "id": 7,
    "slug": "shtaketnik",
    "name": "Штакетник",
    "children": [
      {
        "id": 25,
        "slug": "shtaketnik",
        "name": "Штакетник",
        "parentSlug": "shtaketnik",
        "parentName": "Штакетник"
      }
    ]
  },
  {
    "id": 8,
    "slug": "armaturnye-izdeliya",
    "name": "Арматурные изделия",
    "children": [
      {
        "id": 26,
        "slug": "fiksatory",
        "name": "Фиксаторы",
        "parentSlug": "armaturnye-izdeliya",
        "parentName": "Арматурные изделия"
      },
      {
        "id": 27,
        "slug": "lyagushki",
        "name": "Лягушки",
        "parentSlug": "armaturnye-izdeliya",
        "parentName": "Арматурные изделия"
      },
      {
        "id": 28,
        "slug": "peshki",
        "name": "Пэшки",
        "parentSlug": "armaturnye-izdeliya",
        "parentName": "Арматурные изделия"
      },
      {
        "id": 29,
        "slug": "provoloka-ok",
        "name": "Проволока ОК",
        "parentSlug": "armaturnye-izdeliya",
        "parentName": "Арматурные изделия"
      }
    ]
  },
  {
    "id": 9,
    "slug": "fundament-i-svai",
    "name": "Фундамент и сваи",
    "children": [
      {
        "id": 30,
        "slug": "stroymaterialy",
        "name": "Стройматериалы",
        "parentSlug": "fundament-i-svai",
        "parentName": "Фундамент и сваи"
      },
      {
        "id": 31,
        "slug": "vintovye-svai",
        "name": "Винтовые сваи",
        "parentSlug": "fundament-i-svai",
        "parentName": "Фундамент и сваи"
      },
      {
        "id": 32,
        "slug": "zaglushki-dlya-trub",
        "name": "Заглушки для труб",
        "parentSlug": "fundament-i-svai",
        "parentName": "Фундамент и сваи"
      }
    ]
  },
  {
    "id": 10,
    "slug": "fitingi-i-petli",
    "name": "Фитинги и петли",
    "children": [
      {
        "id": 33,
        "slug": "fitingi",
        "name": "Фитинги",
        "parentSlug": "fitingi-i-petli",
        "parentName": "Фитинги и петли"
      },
      {
        "id": 34,
        "slug": "petli-dlya-vorot",
        "name": "Петли для ворот",
        "parentSlug": "fitingi-i-petli",
        "parentName": "Фитинги и петли"
      }
    ]
  }
];

export const categories: Category[] = categoryGroups.flatMap((group) => group.children);

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryGroupBySlug(slug: string): CategoryGroup | undefined {
  return categoryGroups.find((group) => group.slug === slug);
}
