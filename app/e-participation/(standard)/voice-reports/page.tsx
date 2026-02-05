import Card from "@/app/components/card/Card";
import LastModified from "@/app/components/last-modified/LastModified";

export default function page() {
  const data = [
    {
      id: 1,
      name: " تقارير صوت المستفيد لعام (2024)",
      path: "#",
    },
    {
      id: 2,
      name: " تقارير صوت المستفيد لعام (2023)",
      path: "#",
    },
    {
      id: 3,
      name: " تقارير صوت المستفيد لعام (2022)",
      path: "#",
    },
    {
      id: 4,
      name: " تقارير صوت المستفيد لعام (2021)",
      path: "#",
    },
    {
      id: 5,
      name: " تقارير صوت المستفيد لعام (2020)",
      path: "#",
    },
    {
      id: 6,
      name: " تقارير صوت المستفيد لعام (2019)",
      path: "#",
    },
  ];
  return (
    <>
      <div className="custom-container">
        <section className="section-spacing-5xl">
          <div className="data-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] !mt-[40px]">
            {data.map((data) => (
              <Card
                key={data.id}
                title={data.name}
                linkPrimaryAction={data.path}
                primaryActionLabel="تحميل الملف"
                buttonColor="secondary"
                showPrimaryAction={true}
                primaryTrailIconType="download-04"
                showPrimaryIcon
              />
            ))}
          </div>
        </section>
      </div>
      {/* Last update Date and time */}

      <LastModified
        date="31/12/2025"
        time="2:00 م"
        className="custom-container"
      />
    </>
  );
}
