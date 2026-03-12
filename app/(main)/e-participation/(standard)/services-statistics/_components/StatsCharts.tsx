"use client";

import { DgaChart } from "platformscode-new-react";
import { ChartData } from "../_data/statsData";

interface StatsChartsProps {
  data: ChartData[];
}

export default function StatsCharts({ data }: StatsChartsProps) {
  return (
    <section className="!grid !grid-cols-1 md:!grid-cols-2 !gap-y-8 md:!gap-y-8 !gap-x-0 md:!gap-x-6">
      {data.map((chart, index) => {
        return (
          <div
            key={chart.id || index}
            className="!w-full !border !border-[#d2d6db] !bg-white !p-4 !flex !flex-col !items-center !gap-6 !rounded-[16px] !relative !box-border !overflow-hidden  !text-center"
          >
            <h3 className="!text-[18px] mb-3">{chart.title}</h3>
            <DgaChart
              colors={["#1B8354", "#079455", "#B8EACB", "#54C08A", "#2c684aff"]}
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
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 !w-auto">
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
  );
}
