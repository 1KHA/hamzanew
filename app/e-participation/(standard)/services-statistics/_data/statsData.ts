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
export const servicesStatisticsData: StatisticItem[] = [
  {
    id: 1,
    icon: "user-group",
    number: "000,000",
    title: "المستخدمون",
  },
  { id: 2, icon: "view", number: "000,000", title: "الزيارات" },
  {
    id: 3,
    icon: "web-design-01",
    number: "000,000",
    title: "عدد مرات عرض الصفحة",
  },
  {
    id: 4,
    icon: "bounce-right",
    number: "00%",
    title: "معدل الارتداد Bounce Rate",
  },
];

export const chartsData: ChartData[] = [
  {
    id: 1,
    title: "أنظمة التشغيل",
    labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
    series: [20000, 16000, 11000, 4600, 987],
  },
  {
    id: 2,
    title: "أنواع الاجهزة",
    labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
    series: [20000, 16000, 11000, 4600, 987],
  },
  {
    id: 3,
    title: "اجهزة الجوال",
    labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
    series: [20000, 16000, 11000, 4600, 987],
  },
  {
    id: 4,
    title: "نوع المتصفح",
    labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
    series: [20000, 16000, 11000, 4600, 987],
  },
  {
    id: 5,
    title: "أكثر كلمات البحث استخداما (حتى 10 كلمات بحث)",
    labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
    series: [20000, 16000, 11000, 4600, 987],
  },
];

// ✅ بيانات زيارات حسب الدول (مع رمز الدولة)
export const countriesVisits: CountryVisit[] = [
  { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
  { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
  { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
  { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
  { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
];

// ✅ بيانات زيارات حسب المدن
export const citiesVisits: CityVisit[] = [
  { city: "المدينة", visits: "10 آلاف", percent: "50%" },
  { city: "المدينة", visits: "10 آلاف", percent: "50%" },
  { city: "المدينة", visits: "10 آلاف", percent: "50%" },
  { city: "المدينة", visits: "10 آلاف", percent: "50%" },
  { city: "المدينة", visits: "10 آلاف", percent: "50%" },
];
