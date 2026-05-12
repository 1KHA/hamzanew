import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export type HeroData = {
  title: string;
  description?: string;
  bgColor?: string;
  externalLink?: {
    href: string;
    label: string;
  };
};

export type Crumb = { label: string; path?: string; disabled?: boolean };

export function getHeroMap(locale: "ar" | "en"): Record<string, HeroData & { breadcrumbs?: Crumb[] }> {
  return {
    "/test-takers/hamza-meran-course": {
      title: "hamza-navigation-menu-hamza-maran-hamza",
      description: "",
      bgColor: "#fff",

      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        {
          label: "hamza-navigation-menu-hamza-maran-hamza",
          path: "/test-takers/hamza-meran-course",
          disabled: true,
        },
      ],
    },
    "/test-takers/hamza-meran-course/player": {
      title: "",
      bgColor: "#fff",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-hamza-maran-hamza", path: "/test-takers/hamza-meran-course" },
        {
          label: st("meranCourse", "watchLessonsCrumb", locale),
          path: "/test-takers/hamza-meran-course/player",
          disabled: true,
        },
      ],
    },
    "/test-takers/test-mechanism": {
      title: "hamza-navigation-menu-hamza-test-mechanism",
      description:
        'خيارات مرنة لأداء اختبار همزة فهو اختبار محوسب يوفر لك خيارات متعددة لأداء اختبار سواءً من خلال مراكزنا المعتمدة حضوريًا أو عن بُعد. نلتزم بتطبيق أعلى معايير الأمان والمصداقية، لضمان الحفاظ على ثقة المؤسسات الأكاديمية والمهنية التي تعتمد نتائج اختبار "همزة" في العالم العربي وخارجه',
      bgColor: "#F9FAFB",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        {
          label: "hamza-navigation-menu-hamza-test-mechanism",
          path: "/test-takers/test-mechanism",
          disabled: true,
        },
      ],
    },
    "/test-takers/preparation-resource": {
      title: "hamza-page-level-nav-preparation-sources",
      description:
        "عزّز تجربتك وجهودك الدراسية، وادخل يوم الاختبار بثقة. نوفّر لك أسئلة عملية، ونماذج رسمية، ومواد تدريبية شاملة تساعدك على الاستعداد لاختبار همزة بكل كفاءة. يجتاز ملايين الأشخاص حول العالم هذا الاختبار كل عام — ويمكنك أن تكون أحدهم.",
      bgColor: "#FFF",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        {
          label: "hamza-page-level-nav-preparation-sources",
          path: "/test-takers/preparation-resource",
          disabled: true,
        },
      ],
    },
    "/test-takers/discover-hamza-tests": {
      title: "hamza-navigation-menu-test-takers",
      bgColor: "#F9FAFB",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        {
          label: "hamza-navigation-menu-test-takers",
          path: "/test-takers/discover-hamza-tests",
          disabled: true,
        },
      ],
    },
  };
}

// Function to fetch dynamic test mechanism hero data
export async function getTestMechanismHero(): Promise<
  HeroData & { breadcrumbs?: Crumb[] }
> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseURL}/api/test-takers/test-mechanism`,
      { cache: "no-store", headers: { Cookie: `lang=${locale}` } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch test mechanism data");
    }

    const data = await response.json();

    return {
      title: data.header?.title || "hamza-navigation-menu-hamza-test-mechanism",
      description:
        data.header?.description ||
        'خيارات مرنة لأداء اختبار همزة فهو اختبار محوسب يوفر لك خيارات متعددة لأداء اختبار سواءً من خلال مراكزنا المعتمدة حضوريًا أو عن بُعد. نلتزم بتطبيق أعلى معايير الأمان والمصداقية، لضمان الحفاظ على ثقة المؤسسات الأكاديمية والمهنية التي تعتمد نتائج اختبار "همزة" في العالم العربي وخارجه',
      bgColor: "#F9FAFB",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        {
          label: data.header?.title || "hamza-navigation-menu-hamza-test-mechanism",
          path: "/test-takers/test-mechanism",
          disabled: true,
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching test mechanism hero:", error);
    // Return static fallback data
    return {
      title: "hamza-navigation-menu-hamza-test-mechanism",
      description:
        'خيارات مرنة لأداء اختبار همزة فهو اختبار محوسب يوفر لك خيارات متعددة لأداء اختبار سواءً من خلال مراكزنا المعتمدة حضوريًا أو عن بُعد. نلتزم بتطبيق أعلى معايير الأمان والمصداقية، لضمان الحفاظ على ثقة المؤسسات الأكاديمية والمهنية التي تعتمد نتائج اختبار "همزة" في العالم العربي وخارجه',
      bgColor: "#F9FAFB",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        {
          label: "hamza-navigation-menu-hamza-test-mechanism",
          path: "/test-takers/test-mechanism",
          disabled: true,
        },
      ],
    };
  }
}

// Function to fetch dynamic preparation resource hero data from Lifford
export async function getPreparationResourceHero(): Promise<
  HeroData & { breadcrumbs?: Crumb[] }
> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseURL}/api/test-takers/preparation-resource`,
      { cache: "no-store", headers: { Cookie: `lang=${locale}` } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch preparation resource data");
    }

    const data = await response.json();

    return {
      title: data.header?.title || "hamza-page-level-nav-preparation-sources",
      description: data.header?.description || "",
      bgColor: "#FFF",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        {
          label: data.header?.title || "hamza-page-level-nav-preparation-sources",
          path: "/test-takers/preparation-resource",
          disabled: true,
        },
      ],
    };
  } catch (error) {
    console.error(
      "Error fetching preparation resource hero:",
      error
    );
    // Return static fallback data
    return {
      title: "hamza-page-level-nav-preparation-sources",
      description:
        "عزّز تجربتك وجهودك الدراسية، وادخل يوم الاختبار بثقة. نوفّر لك أسئلة عملية، ونماذج رسمية، ومواد تدريبية شاملة تساعدك على الاستعداد لاختبار همزة بكل كفاءة. يجتاز ملايين الأشخاص حول العالم هذا الاختبار كل عام — ويمكنك أن تكون أحدهم.",
      bgColor: "#FFF",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        { label: "hamza-navigation-menu-test-takers", disabled: true },
        {
          label: "hamza-page-level-nav-preparation-sources",
          path: "/test-takers/preparation-resource",
          disabled: true,
        },
      ],
    };
  }
}
