import dynamic from "next/dynamic";
import type { Service } from "../_data/homeData";

// ssr:true (default) keeps server-rendered HTML; JS chunk is deferred until
// after initial paint so Carousel code doesn't compete with hero LCP.
const ServicesSectionDynamic = dynamic<{ services: Service[] }>(
  () => import("./ServicesSection"),
);
export default ServicesSectionDynamic;
