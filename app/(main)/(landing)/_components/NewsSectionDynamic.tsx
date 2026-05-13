import dynamic from "next/dynamic";

const NewsSectionDynamic = dynamic<{ articles: any[] }>(
  () => import("./NewsSection"),
);
export default NewsSectionDynamic;
