import Image from "next/image";
import SearchBox from "@/app/components/search-box/SearchBox";
import Dropdown from "@/app/components/dropdown/Dropdown";
import "./GlobalStatisticsSection.css";

function StatItem({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <div
      style={{
        boxShadow: "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
        borderRadius: 8,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#fff",
        placeContent: "center",
      }}
    >
      <div className="circular-green flex-shrink-0">
        <img
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
          style={{ width: 24, height: 24, flexShrink: 0 }}
          className="block green-icon"
          src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
        />
      </div>
      <div className="flex flex-col">
        <div className="display-md-bold" style={{ color: "#14573A" }}>{value}</div>
        <div className="text-sm-regular" style={{ color: "#1F2A37" }}>{label}</div>
      </div>
    </div>
  );
}

const STATS = [
  { id: "centers", value: "1.5k", label: "مراكز الاختبار", icon: "building-06" },
  { id: "sessions", value: "12", label: "عدد الجنسيات", icon: "user-group" },
  { id: "countries", value: "22", label: "عدد الدول", icon: "globe-02" },
  { id: "experts", value: "1.5M", label: "مختبر عالميًا", icon: "certificate-01" },
];

function GlobalStatisticsSectionNative() {
  return (
    <>
      <div className="global-statistics-section">
        <div className="search-container">
          <SearchBox label="ابحث عن الدولة" placeholder="ابحث عن الدولة..." size="lg" variant="default" />

          <div className="input-group">
            <Dropdown
              label="نوع الاختبار"
              placeholder="اختبار عام"
              size="lg"
              value="اختبار عام"
              options={[
                { name: "اختبار عام", value: "اختبار عام" },
                { name: "اختبار أكاديمي", value: "اختبار أكاديمي" },
                { name: "اختبار عام 2", value: "اختبار عام2" },
              ]}
            />
          </div>

          <div className="input-group">
            <Dropdown
              label="السنة"
              placeholder="2026"
              size="lg"
              value="2026"
              options={[
                { name: "2026", value: "2026" },
                { name: "2025", value: "2025" },
                { name: "2024", value: "2024" },
                { name: "2023", value: "2023" },
              ]}
            />
          </div>

          <div className="input-group">
            <Dropdown
              label="الجنسية"
              placeholder="امريكية"
              size="lg"
              value="امريكية"
              options={[
                { name: "امريكية", value: "امريكية" },
                { name: "بريطانية", value: "بريطانية" },
                { name: "سعودية", value: "سعودية" },
              ]}
            />
          </div>
        </div>

        <Image
          src="/assets/image/global.png"
          alt="Global Statistics Background"
          width={1200}
          height={600}
          className="w-full md:w-[70%]"
          style={{ height: "auto", aspectRatio: "1200/600" }}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 70vw"
          quality={50}
        />

        <div className="cards-wrapper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] w-full">
            {STATS.map((stat) => (
              <StatItem key={stat.id} value={stat.value} label={stat.label} icon={stat.icon} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default GlobalStatisticsSectionNative;
