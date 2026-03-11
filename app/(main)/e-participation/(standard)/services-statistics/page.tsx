import {
  servicesStatisticsData,
  chartsData,
  countriesVisits,
  citiesVisits,
} from "./_data/statsData";
import StatsCharts from "./_components/StatsCharts";
import ClientOnly from "@/app/components/ClientOnly";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إحصائيات الموقع والخدمات"
};
export default function ServicesStatisticsPage() {
  return (
    <>
      <div className="custom-container">
        <div className="section-spacing-5xl !grid !grid-cols-1 !gap-[32px]">
          <h1 className="display-xs-medium text-[#161616]">
            إحصائيات أداء البوابة (100% | 100,000)
          </h1>

          {/* General Number Statistics */}
          <section className="!grid !grid-cols-1 md:!grid-cols-4 !gap-[24px] lg:!px-35">
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

                <h4 className="display-lg-medium text-[#14573A] mt-[24px]">
                  {item.number}
                </h4>
                <p className="text-md-regular text-[#1d2228] mt-[8px] text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </section>
   
            {/* Pie charts */}
            <StatsCharts data={chartsData} />
   
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
    </>
  );
}
