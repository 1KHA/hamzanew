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
    label: "hamza-navigation-menu-home",
    href: "/",
  },
  {
    id: "about",
    label: "hamza-page-level-nav-who-are-we",
    hasSubmenu: true,
    submenuColumns: [
      {
        title: "hamza-page-level-nav-who-are-we",
        items: [
          {
            label: "hamza-page-level-nav-who-are-we",
            href: "/about",
            icon: "/assets/icons/stroke-standard/user-group-stroke-rounded.svg",
          },
          {
            label: "hamza-navigation-menu-why-choose-hamza",
            href: "/about/hamza-test-traits",
            icon: "/assets/icons/stroke-standard/geometric-shapes-01-stroke-rounded.svg",
          },
          {
            label: "hamza-navigation-menu-benefits-of-hamza-test",
            href: "/about/benefits-of-hamza-test",
            icon: "/assets/icons/stroke-standard/file-star-stroke-rounded.svg",
          },
          {
            label: "hamza-institutions-and-countries-that-accept-the-hamza",
            href: "/about/institutions-and-countries-that-accept-the-hamza",
            icon: "/assets/icons/stroke-standard/checkmark-badge-02-stroke-rounded.svg",
          },
          {
            label: "hamza-periodic-advisory-committee",
            href: "/about/periodic-advisory-committee",
            icon: "/assets/icons/stroke-standard/school-01-stroke-rounded.svg",
          },
        ],
      },
      {
        title: "hamza-navigation-menu-types-of-tests",
        items: [
          {
            label: "hamza-navigation-menu-types-of-tests",
            href: "/types-of-tests",
            icon: "/assets/icons/stroke-standard/right-to-left-list-bullet-stroke-rounded.svg",
          },
          {
            label: "hamza-page-organizations-academic-hamza",
            href: "/types-of-tests/hamza-academic-test",
            icon: "/assets/icons/stroke-standard/mortarboard-01-stroke-rounded.svg",
          },
          {
            label: "hamza-navigation-menu-the-hamza-of-the-year",
            href: "/types-of-tests/hamza-general-test",
            icon: "/assets/icons/stroke-standard/glasses-stroke-rounded.svg",
          },
          {
            label: "hamza-navigation-menu-hamza-to-determine-the-level",
            href: "/types-of-tests/hamza-placement-test",
            icon: "/assets/icons/stroke-standard/star-stroke-rounded.svg",
          },
          {
            label: "hamza-navigation-menu-hamza-for-vocabulary",
            href: "/types-of-tests/hamza-vocabulary-test",
            icon: "/assets/icons/stroke-standard/book-02-stroke-rounded.svg",
          },
        ],
      },
    ],
  },
  {
    id: "test-takers",
    label: "hamza-navigation-menu-test-takers",
    hasSubmenu: true,
    submenuColumns: [
      {
        title: "hamza-navigation-menu-test-takers",
        items: [
          {
            label: "hamza-navigation-menu-test-takers",
            href: "/test-takers/discover-hamza-tests",
            icon: "/assets/icons/stroke-standard/menu-square-stroke-rounded.svg",
          },
          {
            label: "hamza-page-level-nav-preparation-sources",
            href: "/test-takers/preparation-resource",
            icon: "/assets/icons/stroke-standard/book-04-stroke-standard.svg",
          },
          {
            label: "hamza-navigation-menu-hamza-maran-hamza",
            href: "/test-takers/hamza-meran-course",
            icon: "/assets/icons/stroke-standard/course-stroke-standard.svg",
          },
          {
            label: "hamza-navigation-menu-hamza-test-mechanism",
            href: "/test-takers/test-mechanism",
            icon: "/assets/icons/stroke-standard/task-daily-02-stroke-standard.svg",
          },
        ],
      },
    ],
  },
  {
    id: "organizations",
    label: "hamza-navigation-menu-organizations",
    href: "/hamza-org",
  },
  {
    id: "research",
    label: "hamza-navigation-menu-research",
    hasSubmenu: true,
    submenuColumns: [
      {
        title: "الأبحاث",
        items: [
          {
            label: "hamza-navigation-menu-research",
            href: "/research-library",
            icon: "/assets/icons/stroke-standard/book-04-stroke-standard.svg",
          },
          {
            label: "hamza-statistics",
            href: "/statistics-and-reports",
            icon: "/assets/icons/stroke-standard/chart-bar-line-stroke-standard.svg",
          },
        ],
      },
    ],
  },
  {
    id: "news",
    label: "hamza-navigation-menu-news-and-articles",
    hasSubmenu: true,
    submenuColumns: [
      {
        title: "الاخبار",
        items: [
          {
            label: "hamza-latest-news",
            href: "/news/latest",
            icon: "/assets/icons/stroke-standard/book-04-stroke-standard.svg",
          },
          {
            label: "hamza-navigation-menu-news-and-articles",
            href: "/news",
            icon: "/assets/icons/stroke-standard/book-04-stroke-standard.svg",
          },
        ],
      },
    ],
  },
];

export const ACTION_ITEMS = [
  {
    id: "sign-in",
    label: "تسجيل الدخول",
    href: "/sign-in",
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
