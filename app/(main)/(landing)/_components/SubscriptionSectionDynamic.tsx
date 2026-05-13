import dynamic from "next/dynamic";

const SubscriptionSectionDynamic = dynamic(
  () => import("./SubscriptionSection"),
);
export default SubscriptionSectionDynamic;
