import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export type HeroData = {
  title: string;
  description?: string;
  bgColor?: string; // e.g. "#F7FDF9"
  externalLink?: {
    href: string;
    label: string;
  };
};

export type Crumb = { label: string; path?: string; disabled?: boolean };

function getLocaleFromCookie(cookieStore: Awaited<ReturnType<typeof cookies>>): "ar" | "en" {
  const langCookie = cookieStore.get("lang")?.value || "ar-SA";
  return langCookie.startsWith("en") ? "en" : "ar";
}

// Static hero map for routes without dynamic data
const staticHeroMap: Record<string, HeroData & { breadcrumbs?: Crumb[] }> = {
  "/about": {
    title: "hamza-page-level-nav-who-are-we",
    description: "about.heroAboutDescription",
    bgColor: "#F7FDF9",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
    ],
  },

  "/about/who-we-are": {
    title: "hamza-page-level-nav-who-are-we",
    description: "about.heroWhoWeAreDescription",
    bgColor: "#FFF",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", path: "/about" },
      { label: "hamza-page-level-nav-who-are-we", path: "/about/who-we-are", disabled: true },
    ],
  },

  "/about/periodic-advisory-committee": {
    title: "hamza-periodic-advisory-committee",
    description: "about.heroCommitteeDescription",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", path: "/about" },
      {
        label: "hamza-periodic-advisory-committee",
        path: "/about/periodic-advisory-committee",
        disabled: true,
      },
    ],
  },

  "/about/benefits-of-hamza-test": {
    title: "hamza-navigation-menu-benefits-of-hamza-test",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", path: "/about" },
      {
        label: "hamza-navigation-menu-benefits-of-hamza-test",
        path: "/about/benefits-of-hamza-test",
        disabled: true,
      },
    ],
  },
  "/about/institutions-and-countries-that-accept-the-hamza": {
    title: "hamza-institutions-and-countries-that-accept-the-hamza",
    description: "about.heroInstitutionsDescription",
    bgColor: "#FFF",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", path: "/about" },
      {
        label: "hamza-institutions-and-countries-that-accept-the-hamza",
        path: "/about/institutions-and-countries-that-accept-the-hamza",
        disabled: true,
      },
    ],
  },
  "/about/hamza-ambassadors": {
    title: "hamza-navigation-menu-hamza-ambassadors",
    description: "about.heroAmbassadorsDescription",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", path: "/about" },
      {
        label: "hamza-navigation-menu-hamza-ambassadors",
        path: "/about/hamza-ambassadors",
        disabled: true,
      },
    ],
  },
};

// Export the static hero map for non-dynamic routes
export { staticHeroMap as heroMap };

// Function to fetch dynamic periodic advisory committee hero data
export async function getPeriodicAdvisoryCommitteeHero(): Promise<HeroData & { breadcrumbs?: Crumb[] }> {
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value || "ar-SA";
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseURL}/api/periodic-advisory-committee`, {
      cache: 'no-store',
      headers: {
        Cookie: `lang=${langCookie}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch periodic advisory committee data');
    }
    
    const data = await response.json();
    
    return {
      title: data.title,
      description: data.descriptionText,
      bgColor: "#F9FAFB",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", path: "/about" },
        {
          label: data.title,
          path: "/about/periodic-advisory-committee",
          disabled: true,
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching periodic advisory committee hero:', error);
    const cookieStore = await cookies();
    const locale = getLocaleFromCookie(cookieStore);
    return {
      title: "hamza-periodic-advisory-committee",
      description: st("about", "heroCommitteeDescription", locale),
      bgColor: "#F9FAFB",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", path: "/about" },
        {
          label: "hamza-periodic-advisory-committee",
          path: "/about/periodic-advisory-committee",
          disabled: true,
        },
      ],
    };
  }
}

// Function to fetch dynamic who-we-are hero data
export async function getWhoWeAreHero(): Promise<HeroData & { breadcrumbs?: Crumb[] }> {
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value || "ar-SA";
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseURL}/api/about/who-we-are`, {
      cache: "no-store",
      headers: {
        Cookie: `lang=${langCookie}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch who-we-are data");
    }

    const data = await response.json();
    const locale = getLocaleFromCookie(cookieStore);

    return {
      title: data.hero?.title || st("about", "whoWeAre", locale),
      description: data.hero?.description || "",
      bgColor: data.hero?.bgColor || "#FFF",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", path: "/about" },
        {
          label: data.hero?.title || "hamza-page-level-nav-who-are-we",
          path: "/about/who-we-are",
          disabled: true,
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching who-we-are hero:", error);
    const cookieStore = await cookies();
    const locale = getLocaleFromCookie(cookieStore);
    return {
      title: "hamza-page-level-nav-who-are-we",
      description: st("about", "heroWhoWeAreDescription", locale),
      bgColor: "#FFF",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", path: "/about" },
        { label: "hamza-page-level-nav-who-are-we", path: "/about/who-we-are", disabled: true },
      ],
    };
  }
}

// Function to fetch dynamic hamza ambassadors hero data
export async function getHamzaAmbassadorsHero(): Promise<HeroData & { breadcrumbs?: Crumb[] }> {
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value || "ar-SA";
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseURL}/api/hamza-ambassadors`, {
      cache: 'no-store',
      headers: {
        Cookie: `lang=${langCookie}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch hamza ambassadors data');
    }
    
    const data = await response.json();
    
    return {
      title: data.title,
      description: data.descriptionText,
      bgColor: "#F9FAFB",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", path: "/about" },
        {
          label: data.title,
          path: "/about/hamza-ambassadors",
          disabled: true,
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching hamza ambassadors hero:', error);
    const cookieStore = await cookies();
    const locale = getLocaleFromCookie(cookieStore);
    return {
      title: "hamza-navigation-menu-hamza-ambassadors",
      description: st("about", "heroAmbassadorsDescription", locale),
      bgColor: "#F9FAFB",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", path: "/about" },
        {
          label: "hamza-navigation-menu-hamza-ambassadors",
          path: "/about/hamza-ambassadors",
          disabled: true,
        },
      ],
    };
  }
}

// Function to fetch dynamic hamza test traits hero data
export async function getHamzaTestTraitsHero(): Promise<HeroData & { breadcrumbs?: Crumb[] }> {
  try {
    // Get the lang cookie to forward to the API
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value || "ar-SA";
    const locale = getLocaleFromCookie(cookieStore);
    
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseURL}/api/traits`, {
      cache: 'no-store',
      headers: {
        Cookie: `lang=${langCookie}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch traits data');
    }
    
    const data = await response.json();
    
    return {
      title: data.title || "hamza-navigation-menu-why-choose-hamza",
      description: st("about", "heroTraitsDescription", locale),
      bgColor: "#F9FAFB",
      externalLink: {
        href: "/sign-up",
        label: st("services", "register", locale),
      },
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", path: "/about" },
        {
          label: data.title || "hamza-navigation-menu-why-choose-hamza",
          path: "/about/hamza-test-traits",
          disabled: true,
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching traits hero:', error);
    const cookieStore = await cookies();
    const locale = getLocaleFromCookie(cookieStore);
    return {
      title: "hamza-navigation-menu-why-choose-hamza",
      description: st("about", "heroTraitsDescription", locale),
      bgColor: "#F9FAFB",
      externalLink: {
        href: "/sign-up",
        label: st("services", "register", locale),
      },
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", path: "/about" },
        {
          label: "hamza-navigation-menu-why-choose-hamza",
          path: "/about/hamza-test-traits",
          disabled: true,
        },
      ],
    };
  }
}
