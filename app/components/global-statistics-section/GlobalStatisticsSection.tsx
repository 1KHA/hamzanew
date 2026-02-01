import { DgaDropdown, DgaSearchBox } from "platformscode-new-react";
import Card from "../card/Card";
import "./GlobalStatisticsSection.css";

function GlobalStatisticsSection() {
  // Fake stats data
  const stats = [
    {
      id: "centers",
      value: "1.5k",
      label: "مراكز الاختبار",
      icon: "building-06", // change to your DgaIcon name
    },
    {
      id: "sessions",
      value: "12",
      label: "عدد الجنسيات",
      icon: "user-group",
    },
    {
      id: "countries",
      value: "22",
      label: "عدد الدول",
      icon: "globe-02",
    },
    {
      id: "experts",
      value: "1.5M",
      label: " مختبر  عالميًا",
      icon: "certificate-01",
    },
  ];

  const statsCard = stats.map((stat) => {
    return (
   <Card
  style={{
    border: "none",
    boxShadow:
      "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
  }}
  key={stat.id}
  title={stat.value}
  description={stat.label}
  icon={stat.icon}
  iconPosition="left"
  contentAlignment="center"
  titleClass="display-md-bold"
  titleColor="#14573A"
  descriptionClass="text-sm-medium"
  descriptionColor="#667085"
/>
    );
  });

  return (
    <>
      <div className="global-statistics-section">
        {/* Search section */}
        <div className="search-container">
          <DgaSearchBox
            label="ابحث عن الدولة"
            showTrailingIcon={false}
            size="lg"
            variant="default"
          />
          <div className="input-group">
            <label className="input-label">نوع الاختبار</label>
            <DgaDropdown
              placeholder="اختبار عام"
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              options={[
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
              ]}
            />
          </div>
          <div className="input-group">
            <label className="input-label">السنة</label>
            <DgaDropdown
              placeholder="2026"
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              options={[
                {
                  label: "2026",
                  value: "2026",
                },
                {
                  label: "2025",
                  value: "2025",
                },
                {
                  label: "2024",
                  value: "2024",
                },
                {
                  label: "2023",
                  value: "2023",
                },
              ]}
            />
          </div>
          <div className="input-group">
            <label className="input-label">الجنسية</label>
            <DgaDropdown
              placeholder="امريكية"
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              options={[
                {
                  label: "امريكية",
                  value: "امريكية",
                },
                {
                  label: "بريطانية",
                  value: "بريطانية",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
              ]}
            />
          </div>
        </div>
        {/* statistics section */}
        <div className="cards-wrapper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] w-full">{statsCard}</div>
        </div>
      </div>
    </>
  );
}

export default GlobalStatisticsSection;
