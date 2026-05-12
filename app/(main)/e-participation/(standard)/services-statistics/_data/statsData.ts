import { st } from "@/app/_lib/static-text-server";

export interface StatisticItem {
  id: number;
  icon: string;
  number: string;
  title: string;
}

export interface ChartData {
  id: number;
  title: string;
  labels: string[];
  series: number[];
}

export interface CountryVisit {
  country: string;
  code: string;
  visits: string;
  percent: string;
}

export interface CityVisit {
  city: string;
  visits: string;
  percent: string;
}

// General Number Statistics
export function getServicesStatisticsData(locale: "ar" | "en"): StatisticItem[] {
  return [
    {
      id: 1,
      icon: "user-group",
      number: "000,000",
      title: st("eParticipation", "statUsers", locale),
    },
    { id: 2, icon: "view", number: "000,000", title: st("eParticipation", "statVisits", locale) },
    {
      id: 3,
      icon: "web-design-01",
      number: "000,000",
      title: st("eParticipation", "statPageViews", locale),
    },
    {
      id: 4,
      icon: "bounce-right",
      number: "00%",
      title: st("eParticipation", "statBounceRate", locale),
    },
  ];
}

export function getChartsData(locale: "ar" | "en"): ChartData[] {
  return [
    {
      id: 1,
      title: st("eParticipation", "statOperatingSystems", locale),
      labels: [
        st("eParticipation", "statValue1", locale),
        st("eParticipation", "statValue2", locale),
        st("eParticipation", "statValue3", locale),
        st("eParticipation", "statValue4", locale),
      ],
      series: [20000, 16000, 11000, 4600, 987],
    },
    {
      id: 2,
      title: st("eParticipation", "statDeviceTypes", locale),
      labels: [
        st("eParticipation", "statValue1", locale),
        st("eParticipation", "statValue2", locale),
        st("eParticipation", "statValue3", locale),
        st("eParticipation", "statValue4", locale),
      ],
      series: [20000, 16000, 11000, 4600, 987],
    },
    {
      id: 3,
      title: st("eParticipation", "statMobileDevices", locale),
      labels: [
        st("eParticipation", "statValue1", locale),
        st("eParticipation", "statValue2", locale),
        st("eParticipation", "statValue3", locale),
        st("eParticipation", "statValue4", locale),
      ],
      series: [20000, 16000, 11000, 4600, 987],
    },
    {
      id: 4,
      title: st("eParticipation", "statBrowserType", locale),
      labels: [
        st("eParticipation", "statValue1", locale),
        st("eParticipation", "statValue2", locale),
        st("eParticipation", "statValue3", locale),
        st("eParticipation", "statValue4", locale),
      ],
      series: [20000, 16000, 11000, 4600, 987],
    },
    {
      id: 5,
      title: st("eParticipation", "statTopSearchTerms", locale),
      labels: [
        st("eParticipation", "statValue1", locale),
        st("eParticipation", "statValue2", locale),
        st("eParticipation", "statValue3", locale),
        st("eParticipation", "statValue4", locale),
      ],
      series: [20000, 16000, 11000, 4600, 987],
    },
  ];
}

// ✅ بيانات زيارات حسب الدول (مع رمز الدولة)
export function getCountriesVisits(locale: "ar" | "en"): CountryVisit[] {
  return [
    { country: st("eParticipation", "statCountryPlaceholder", locale), code: "", visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
    { country: st("eParticipation", "statCountryPlaceholder", locale), code: "", visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
    { country: st("eParticipation", "statCountryPlaceholder", locale), code: "", visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
    { country: st("eParticipation", "statCountryPlaceholder", locale), code: "", visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
    { country: st("eParticipation", "statCountryPlaceholder", locale), code: "", visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
  ];
}

// ✅ بيانات زيارات حسب المدن
export function getCitiesVisits(locale: "ar" | "en"): CityVisit[] {
  return [
    { city: st("eParticipation", "statCityPlaceholder", locale), visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
    { city: st("eParticipation", "statCityPlaceholder", locale), visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
    { city: st("eParticipation", "statCityPlaceholder", locale), visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
    { city: st("eParticipation", "statCityPlaceholder", locale), visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
    { city: st("eParticipation", "statCityPlaceholder", locale), visits: st("eParticipation", "statVisitsPlaceholder", locale), percent: "50%" },
  ];
}
