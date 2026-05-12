import { st } from "@/app/_lib/static-text-server";

export function getReportsData(locale: "ar" | "en") {
  return [
    { id: "1", title: st("statisticsAndReports", "report1Title", locale), downloadUrl: "/reports/report-1.pdf" },
    { id: "2", title: st("statisticsAndReports", "report2Title", locale), downloadUrl: "/reports/report-2.pdf" },
    { id: "3", title: st("statisticsAndReports", "report3Title", locale), downloadUrl: "/reports/report-3.pdf" },
    { id: "4", title: st("statisticsAndReports", "report4Title", locale), downloadUrl: "/reports/report-4.pdf" },
    { id: "5", title: st("statisticsAndReports", "report5Title", locale), downloadUrl: "/reports/report-5.pdf" },
    { id: "6", title: st("statisticsAndReports", "report6Title", locale), downloadUrl: "/reports/report-6.pdf" },
    { id: "7", title: st("statisticsAndReports", "report7Title", locale), downloadUrl: "/reports/report-7.pdf" },
    { id: "8", title: st("statisticsAndReports", "report8Title", locale), downloadUrl: "/reports/report-8.pdf" },
    { id: "9", title: st("statisticsAndReports", "report9Title", locale), downloadUrl: "/reports/report-9.pdf" },
    { id: "10", title: st("statisticsAndReports", "report10Title", locale), downloadUrl: "/reports/report-10.pdf" },
    { id: "11", title: st("statisticsAndReports", "report11Title", locale), downloadUrl: "/reports/report-11.pdf" },
    { id: "12", title: st("statisticsAndReports", "report12Title", locale), downloadUrl: "/reports/report-12.pdf" },
    { id: "13", title: st("statisticsAndReports", "report13Title", locale), downloadUrl: "/reports/report-13.pdf" },
    { id: "14", title: st("statisticsAndReports", "report14Title", locale), downloadUrl: "/reports/report-14.pdf" },
    { id: "15", title: st("statisticsAndReports", "report15Title", locale), downloadUrl: "/reports/report-15.pdf" },
  ];
}
