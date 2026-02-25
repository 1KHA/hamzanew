// menuData.ts
export type MenuItemType = {
  id: string;
  label: string;
  href?: string;
  hasSubmenu?: boolean;
  submenuColumns?: SubmenuColumn[];
};

export type SubmenuColumn = {
  title: string;
  items: SubmenuItem[];
};

export type SubmenuItem = {
  label: string;
  href: string;
  icon: string;
};

export const MENU_DATA: MenuItemType[] = [
  {
    id: "home",
    label: "الرئيسية",
    href: "/",
  },
  {
    id: "about",
    label: "عن الجهة",
    hasSubmenu: true,
    submenuColumns: [
      {
        title: "عن همزة",
        items: [
          {
            label: "عن الجهة",
            href: "/about",
            icon: "/assets/icons/stroke-standard/user-group-stroke-rounded.svg",
          },
          {
            label: "سمات اختبار همزة",
            href: "/about/hamza-test-traits",
            icon: "/assets/icons/stroke-standard/geometric-shapes-01-stroke-rounded.svg",
          },
          {
            label: "أهمية اختبارات همزة",
            href: "/about/benefits-of-hamza-test",
            icon: "/assets/icons/stroke-standard/file-star-stroke-rounded.svg",
          },
          {
            label: "المؤسسات والدول التي تقبل همزة",
            href: "/about/institutions-and-countries-that-accept-the-hamza",
            icon: "/assets/icons/stroke-standard/checkmark-badge-02-stroke-rounded.svg",
          },
          {
            label: "اللجنة الاستشارية الدورية",
            href: "/about/periodic-advisory-committee",
            icon: "/assets/icons/stroke-standard/school-01-stroke-rounded.svg",
          },
        ],
      },
      {
        title: "الاختبارات",
        items: [
          {
            label: "أنواع اختبارات همزة",
            href: "/types-of-tests",
            icon: "/assets/icons/stroke-standard/right-to-left-list-bullet-stroke-rounded.svg",
          },
          {
            label: "همزة الأكاديمي",
            href: "/types-of-tests/hamza-academic-test",
            icon: "/assets/icons/stroke-standard/mortarboard-01-stroke-rounded.svg",
          },
          {
            label: "همزة العام",
            href: "/types-of-tests/hamza-general-test",
            icon: "/assets/icons/stroke-standard/glasses-stroke-rounded.svg",
          },
          {
            label: "همزة لتحديد المستوى",
            href: "/types-of-tests/hamza-placement-test",
            icon: "/assets/icons/stroke-standard/star-stroke-rounded.svg",
          },
          {
            label: "همزة للمفردات",
            href: "/types-of-tests/hamza-vocabulary-test",
            icon: "/assets/icons/stroke-standard/book-02-stroke-rounded.svg",
          },
        ],
      },
    ],
  },
  {
    id: "test-takers",
    label: "المتقدمون للإختبار",
    hasSubmenu: true,
    submenuColumns: [
      {
        title: "الإستعداد للإختبار",
        items: [
          {
            label: "مصادر التحضير",
            href: "#",
            icon: "/assets/icons/stroke-standard/book-04-stroke-standard.svg",
          },
          {
            label: "دورة مران همزة",
            href: "/test-takers/preparation-resource",
            icon: "/assets/icons/stroke-standard/course-stroke-standard.svg",
          },
          {
            label: "آلية الإختبار (محوسب حضوري، محوسب عن بعد)",
            href: "/test-takers/test-mechanism",
            icon: "/assets/icons/stroke-standard/task-daily-02-stroke-standard.svg",
          },
        ],
      },
    ],
  },
  {
    id: "organizations",
    label: "المنظمات",
    href: "#",
  },
  {
    id: "research",
    label: "الأبحاث",
    hasSubmenu: true,
    submenuColumns: [
      {
        title: "الأبحاث",
        items: [
          {
            label: "مكتبة الأبحاث",
            href: "/research-library",
            icon: "/assets/icons/stroke-standard/book-04-stroke-standard.svg",
          },
          {
            label: "التقارير والإحصائيات",
            href: "/statistics-and-reports",
            icon: "/assets/icons/stroke-standard/chart-bar-line-stroke-standard.svg",
          },
        ],
      },
    ],
  },
  {
    id: "news",
    label: "الاخبار",
    href: "/news",
  },
];

export const ACTION_ITEMS = [
  {
    id: "sign-in",
    label: "تسجيل الدخول",
    href: "#",
    icon: "/assets/icons/stroke-standard/user-03-stroke-standard.svg",
    className: "action-btn-reversed",
  },
  {
    id: "search",
    label: "",
    href: "/search",
    icon: "/assets/icons/stroke-standard/search-01-stroke-standard.svg",
    className: "action-btn-reversed translate-btn",
  },
];