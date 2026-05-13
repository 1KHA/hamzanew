import dynamic from "next/dynamic";
import type { Partner } from "../_data/homeData";

const PartnersSectionDynamic = dynamic<{ partners: Partner[] }>(
  () => import("./PartnersSection"),
);

export default function PartnersSectionDynamic({ fallbackPartners }: { fallbackPartners?: Partner[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <Placeholder />;
  return <PartnersSection fallbackPartners={fallbackPartners} />;
}
