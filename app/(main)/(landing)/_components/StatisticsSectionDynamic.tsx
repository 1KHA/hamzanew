import dynamic from "next/dynamic";

const StatisticsSectionDynamic = dynamic(
  () => import("./StatisticsSection"),
);
export default StatisticsSectionDynamic;
