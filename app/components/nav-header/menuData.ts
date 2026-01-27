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
            label: "لماذا تختار همزة؟",
            href: "#",
            icon: "/assets/icons/stroke-standard/message-question-stroke-rounded.svg",
          },
          {
            label: "فوائد اختبارات همزة",
            href: "#",
            icon: "/assets/icons/stroke-standard/file-star-stroke-rounded.svg",
          },
          {
            label: "المؤسسات والدول التي تقبل همزة",
            href: "#",
            icon: "/assets/icons/stroke-standard/checkmark-badge-02-stroke-rounded.svg",
          },
          {
            label: "اللجنة الاستشارية الدولية",
            href: "#",
            icon: "/assets/icons/stroke-standard/school-01-stroke-rounded.svg",
          },
        ],
      },
      {
        title: "الاختبارات",
        items: [
          {
            label: "أنواع اختبارات همزة",
            href: "#",
            icon: "/assets/icons/stroke-standard/right-to-left-list-bullet-stroke-rounded.svg",
          },
          {
            label: "همزة الأكاديمي",
            href: "#",
            icon: "/assets/icons/stroke-standard/mortarboard-01-stroke-rounded.svg",
          },
          {
            label: "همزة العام",
            href: "#",
            icon: "/assets/icons/stroke-standard/glasses-stroke-rounded.svg",
          },
          {
            label: "همزة لتحديد المستوى",
            href: "#",
            icon: "/assets/icons/stroke-standard/star-stroke-rounded.svg",
          },
          {
            label: "همزة للمفردات",
            href: "#",
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
            href: "#",
            icon: "/assets/icons/stroke-standard/course-stroke-standard.svg",
          },
          {
            label: "آلية الإختبار (محوسب حضوري، محوسب عن بعد)",
            href: "#",
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
            href: "#",
            icon: "/assets/icons/stroke-standard/book-04-stroke-standard.svg",
          },
          {
            label: "الإحصائيات",
            href: "#",
            icon: "/assets/icons/stroke-standard/chart-bar-line-stroke-standard.svg",
          },
        ],
      },
    ],
  },
  {
    id: "news",
    label: "الاخبار",
    href: "#",
  },
];

export const ACTION_ITEMS = [
  {
    label: "الترجمة",
    href: "#",
    icon: "/assets/icons/stroke-standard/translation-stroke-rounded.svg",
    className: "action-btn-reversed",
  },
  {
    label: "تسجيل الدخول",
    href: "#",
    icon: "/assets/icons/stroke-standard/user-03-stroke-standard.svg",
    className: "action-btn-reversed",
  },
  {
    label: null,
    href: "#",
    icon: "/assets/icons/stroke-standard/search-01-stroke-standard.svg",
    className: "action-btn-reversed translate-btn",
  },
];