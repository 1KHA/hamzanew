import { st } from "@/app/_lib/static-text-server";

export type HeroData = {
  title: string;
  description?: string;
  bgColor?: string; // e.g. "#F7FDF9"

};

export type Crumb = { label: string; path?: string; disabled?: boolean };

export function getHeroMap(locale: "ar" | "en"): Record<string, HeroData & { breadcrumbs?: Crumb[] }> {
  return {
    "/e-participation": {
      title: st("eParticipation", "eParticipationTitle", locale),
      description: "about.heroAboutDescription",
      bgColor: "#F7FDF9",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: "hamza-page-level-nav-who-are-we", path: "/about" },
        { label: st("eParticipation", "eParticipationTitle", locale), disabled: true },
      ],
    },
    "/e-participation/policy": {
      title: st("eParticipation", "policyTitle", locale),
      bgColor: "#F7FDF9",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: st("eParticipation", "eParticipationTitle", locale), path: "/e-participation" },
        { label: st("eParticipation", "policyTitle", locale), disabled: true },
      ],
    },
    "/e-participation/consultations": {
      title: st("eParticipation", "consultationTitle", locale),
      bgColor: "#F7FDF9",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: st("eParticipation", "eParticipationTitle", locale), path: "/e-participation" },
        { label: st("eParticipation", "consultationTitle", locale), disabled: true },
      ],
    },
    "/e-participation/co-creation": {
      title: st("eParticipation", "coCreationTitle", locale),
      bgColor: "#F7FDF9",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: st("eParticipation", "eParticipationTitle", locale), path: "/e-participation" },
        { label: st("eParticipation", "coCreationTitle", locale), disabled: true },
      ],
    },
    "/e-participation/open-data": {
      title: st("eParticipation", "openDataTitle", locale),
      bgColor: "#F7FDF9",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: st("eParticipation", "eParticipationTitle", locale), path: "/e-participation" },
        { label: st("eParticipation", "openDataTitle", locale), disabled: true },
      ],
    },
    "/e-participation/socail-media": {
      title: st("eParticipation", "socialMediaTitle", locale),
      bgColor: "#F7FDF9",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: st("eParticipation", "eParticipationTitle", locale), path: "/e-participation" },
        { label: st("eParticipation", "socialMediaTitle", locale), disabled: true },
      ],
    },
    "/e-participation/voice-reports": {
      title: st("eParticipation", "voiceReportsTitle", locale),
      bgColor: "#F7FDF9",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: st("eParticipation", "eParticipationTitle", locale), path: "/e-participation" },
        { label: st("eParticipation", "voiceReportsTitle", locale), disabled: true },
      ],
    },
    "/e-participation/services-statistics": {
      title: st("eParticipation", "servicesStatsTitle", locale),
      bgColor: "#F7FDF9",
      breadcrumbs: [
        { label: "hamza-navigation-menu-home", path: "/" },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: "hamza-page-level-nav-who-are-we", disabled: true },
        { label: st("eParticipation", "eParticipationTitle", locale), path: "/e-participation" },
        { label: st("eParticipation", "servicesStatsTitle", locale), disabled: true },
      ],
    },
  };
}
