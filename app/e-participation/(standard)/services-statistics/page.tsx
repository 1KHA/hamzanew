import LastModified from "@/app/components/last-modified/LastModified";
import { DgaChart } from "platformscode-new-react";
import { title } from "process";
export default function page() {
  // General Number Statistics
  const servicesStatisticsData = [
    {
      id: 1,
      icon: "user-group",
      number: "000,000",
      title: "المستخدمون",
    },
    { id: 2, icon: "view", number: "000,000", title: "الزيارات" },
    {
      id: 3,
      icon: "web-design-01",
      number: "000,000",
      title: "عدد مرات عرض الصفحة",
    },
    {
      id: 4,
      icon: "bounce-right",
      number: "00%",
      title: "معدل الارتداد Bounce Rate",
    },
  ];

  const chartsData = [
    {
      id: 1,
      title: "أنظمة التشغيل",
      labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
      series: [20000, 16000, 11000, 4600, 987],
    },
    {
      id: 2,
      title: "أنواع الاجهزة",
      labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
      series: [20000, 16000, 11000, 4600, 987],
    },
    {
      id: 3,
      title: "اجهزة الجوال",
      labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
      series: [20000, 16000, 11000, 4600, 987],
    },
    {
      id: 4,
      title: "نوع المتصفح",
      labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
      series: [20000, 16000, 11000, 4600, 987],
    },
    {
      id: 5,
      title: "أكثر كلمات البحث استخداما (حتى 10 كلمات بحث)",
      labels: ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
      series: [20000, 16000, 11000, 4600, 987],
    },
  ];

  // ✅ بيانات زيارات حسب الدول (مع رمز الدولة)
  const countriesVisits = [
    { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
    { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
    { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
    { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
    { country: "الدولة", code: "", visits: "10 آلاف", percent: "50%" },
  ];

  // ✅ بيانات زيارات حسب المدن
  const citiesVisits = [
    { city: "المدينة", visits: "10 آلاف", percent: "50%" },
    { city: "المدينة", visits: "10 آلاف", percent: "50%" },
    { city: "المدينة", visits: "10 آلاف", percent: "50%" },
    { city: "المدينة", visits: "10 آلاف", percent: "50%" },
    { city: "المدينة", visits: "10 آلاف", percent: "50%" },
  ];

  return (
    <>
      {/* ✅ Main Content */}
      <div className="custom-container">
        <div className="section-spacing-5xl !grid !grid-cols-1 !gap-[32px]">
          <h1 className="display-xs-medium  text-[#161616]">
            إحصائيات أداء البوابة (100% | 100,000)
          </h1>
          {/* General Number Statistics*/}
          <section className="!grid 1grid-cols-1 md:!grid-cols-4 !gap-[24px] lg:!px-35">
            {servicesStatisticsData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-center items-center gap-5 item-data"
              >
                <div className="circel">
                  <img
                    className="icon-green"
                    width={28}
                    height={28}
                    src={`/assets/icons/stroke-standard/${item.icon}-stroke-rounded.svg`}
                    alt={item.icon}
                  />
                </div>

                <h4 className="display-lg-medium  text-[#14573A] mt-[24px]">
                  {item.number}
                </h4>
                <p className="text-md-regular text-[#1d2228] mt-[8px] text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </section>

          {/* Pie charts */}
          <section className="!grid !grid-cols-1 md:!grid-cols-2 !gap-y-8 md:!gap-y-8 !gap-x-0 md:!gap-x-6">
            {chartsData.map((chart, index) => {
              return (
                <div
                  key={index}
                  className="!w-full !border !border-[#d2d6db] !bg-white !p-4 !flex !flex-col !items-center !gap-6 !rounded-[16px] !relative !box-border !overflow-hidden  !text-center"
                >
                  <h3 className="!text-[18px] mb-3">{chart.title}</h3>
                  <DgaChart
                    colors={[
                      "#1B8354",
                      "#079455",
                      "#B8EACB",
                      "#54C08A",
                      "#2c684aff",
                    ]}
                    height="400px"
                    labels={chart.labels}
                    series={chart.series}
                    type="pie"
                    width="100%"
                    options={{
                      dataLabels: {
                        enabled: false, // hides the label on the chart
                      },
                      legend: {
                        show: false, // hides the legend list
                      },
                    }}
                  />

                  <div
                    className="flex flex-row justify-center gap-4 mt-4 text-[#161616]"
                    // dir="rtl"
                  >
                    {[
                      { color: "#1B8354", label: chart.labels[0] },
                      { color: "#079455", label: chart.labels[1] },
                      { color: "#B8EACB", label: chart.labels[2] },
                      { color: "#54C08A", label: chart.labels[3] },
                      { color: "#2c684aff", label: chart.labels[4] },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 !w-auto"
                      >
                        <span
                          className="inline-block w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="text-[14px]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Table */}

          <section className="!grid !grid-cols-1 md:!grid-cols-2 !gap-y-8 md:!gap-y-8 !gap-x-0 md:!gap-x-6">
            {/* Table 1 - country */}
            <div className="!w-full !border !border-[#d2d6db] !bg-white !p-4 !flex !flex-col !items-center !gap-6 !rounded-[16px] !relative !box-border !overflow-hidden !items-center">
              <h3 className="!text-[18px] mb-3">الزيارات حسب الدول</h3>
              <table className="!w-full !border-separate !border-spacing-0 !border !border-[#d2d6db] !rounded-[8px] !overflow-hidden">
                <thead className="!bg-[#f3f4f6]">
                  <tr className="ltr:[&>th+th]:!border-l rtl:[&>th+th]:!border-r [&>th+th]:!border-[#e5e7eb]">
                    <th className="!px-4 !py-3 !text-sm !font-medium !text-[#161616] !text-center">
                      الدولة
                    </th>
                    <th className="!px-4 !py-3 !text-sm !font-medium !text-[#161616] !text-center">
                      عدد الزيارات
                    </th>
                    <th className="!px-4 !py-3 !text-sm !font-medium !text-[#161616] !text-center">
                      النسبة
                    </th>
                  </tr>
                </thead>
                <tbody className="[&>tr]:!bg-white [&>tr:nth-child(even)]:!bg-[#f9fafb] [&>tr+tr]:!border-t [&>tr+tr]:!border-[#e5e7eb]">
                  {countriesVisits.map((row, i) => (
                    <tr key={i}>
                      <td className="!px-4 !py-4 !text-sm !text-[#161616] !text-center">
                        {/* {row.code && (
                          <img
                            src={`https://flagcdn.com/w40/${row.code}.png`}
                            alt={row.country}
                            className="!w-6 h-4 rounded-sm border border-gray-200"
                          />
                        )} */}
                        {row.country}
                      </td>
                      <td className="!px-4 !py-4 !text-sm !text-[#161616] !text-center">
                        {row.visits}
                      </td>
                      <td className="!px-4 !py-4 !text-sm !text-[#161616] !text-center">
                        {row.percent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table 2 - cities */}
            <div className="!w-full !border !border-[#d2d6db] !bg-white !p-4 !flex !flex-col !items-center !gap-6 !rounded-[16px] !relative !box-border !overflow-hidden !items-center">
              <h3 className="!text-[18px] mb-3">الزيارات حسب الدن</h3>
              <table className="!w-full !border-separate !border-spacing-0 !border !border-[#d2d6db] !rounded-[8px] !overflow-hidden">
                <thead className="!bg-[#f3f4f6]">
                  <tr className="ltr:[&>th+th]:!border-l rtl:[&>th+th]:!border-r [&>th+th]:!border-[#e5e7eb]">
                    <th className="!px-4 !py-3 !text-sm !font-medium !text-[#161616] !text-center">
                      المدينة
                    </th>
                    <th className="!px-4 !py-3 !text-sm !font-medium !text-[#161616] !text-center">
                      عدد الزيارات
                    </th>
                    <th className="!px-4 !py-3 !text-sm !font-medium !text-[#161616] !text-center">
                      النسبة
                    </th>
                  </tr>
                </thead>
                <tbody className="[&>tr]:!bg-white [&>tr:nth-child(even)]:!bg-[#f9fafb] [&>tr+tr]:!border-t [&>tr+tr]:!border-[#e5e7eb]">
                  {citiesVisits.map((row, i) => (
                    <tr key={i}>
                      <td className="!px-4 !py-4 !text-sm !text-[#161616] !text-center">
                        {row.city}
                      </td>
                      <td className="!px-4 !py-4 !text-sm !text-[#161616] !text-center">
                        {row.visits}
                      </td>
                      <td className="!px-4 !py-4 !text-sm !text-[#161616] !text-center">
                        {row.percent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
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
