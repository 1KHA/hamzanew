import dynamic from "next/dynamic";
import type { Partner } from "../_data/homeData";

const PartnersSectionDynamic = dynamic<{ partners: Partner[] }>(
  () => import("./PartnersSection"),
);
export default PartnersSectionDynamic;
