"use client";

import { useEffect, useRef, memo } from "react";
import type { ApexOptions } from "apexcharts";

type ChartType =
  | "line" | "bar" | "pie" | "donut" | "area"
  | "scatter" | "bubble" | "heatmap" | "radar"
  | "radialBar" | "rangeBar" | "treemap";

interface ChartProps {
  type?: ChartType;
  series?: ApexOptions["series"];
  labels?: string[];
  options?: ApexOptions;
  width?: string | number;
  height?: string | number;
  colors?: string[];
  xaxis?: ApexOptions["xaxis"];
  yaxis?: ApexOptions["yaxis"];
}

const TYPE_DEFAULTS: Partial<Record<ChartType, ApexOptions>> = {
  pie: {
    chart: { type: "donut" },
    colors: ["#1B8354", "#079455", "#B8EACB", "#54C08A"],
    plotOptions: { pie: { startAngle: -180, endAngle: 180, donut: { size: "40%" } } },
    stroke: { show: false },
    legend: { show: true, position: "bottom", horizontalAlign: "center", fontSize: "14px", fontFamily: "IBMPlexSansArabic" },
  },
  donut: {
    chart: { type: "donut" },
    colors: ["#1B8354", "#079455", "#B8EACB", "#54C08A"],
    plotOptions: { pie: { startAngle: -180, endAngle: 180, donut: { size: "40%" } } },
    stroke: { show: false },
    legend: { show: true, position: "bottom", horizontalAlign: "center", fontSize: "14px", fontFamily: "IBMPlexSansArabic" },
  },
  line: {
    chart: { type: "line", height: 350, stacked: false, zoom: { enabled: false }, toolbar: { show: false } },
    colors: ["#1B8354", "#079455", "#B8EACB", "#54C08A"],
    dataLabels: { enabled: false },
    stroke: { width: [4, 4], curve: "smooth" },
    legend: { show: true, position: "top", horizontalAlign: "right", fontSize: "14px", fontFamily: "IBMPlexSansArabic" },
  },
  bar: {
    chart: { type: "bar", height: 350, stacked: true, toolbar: { show: false }, zoom: { enabled: false } },
    colors: ["#1B8354", "#54C08A", "#E5E7EB"],
    dataLabels: { enabled: false },
    plotOptions: { bar: { horizontal: false, borderRadius: 10, borderRadiusApplication: "end", borderRadiusWhenStacked: "last" } },
    legend: { show: true, position: "top", horizontalAlign: "right", fontSize: "14px", fontFamily: "IBMPlexSansArabic" },
    fill: { opacity: 1 },
  },
};

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const out = { ...target };
  for (const key in source) {
    const sv = source[key];
    const tv = target[key];
    if (sv && typeof sv === "object" && !Array.isArray(sv) && tv && typeof tv === "object" && !Array.isArray(tv)) {
      out[key] = deepMerge(tv as Record<string, unknown>, sv as Record<string, unknown>);
    } else {
      out[key] = sv;
    }
  }
  return out;
}

function buildConfig(props: ChartProps): ApexOptions {
  const { type, width, height, series, labels, xaxis, yaxis, colors, options = {} } = props;
  const resolvedType = type ?? (options.chart as { type?: ChartType } | undefined)?.type;
  const defaults = (resolvedType ? TYPE_DEFAULTS[resolvedType] : {}) ?? {};

  const merged = deepMerge(
    defaults as Record<string, unknown>,
    options as Record<string, unknown>
  ) as ApexOptions;

  merged.chart = { ...merged.chart };
  if (type) merged.chart.type = type as ApexOptions["chart"] extends { type?: infer T } ? T : never;
  if (width != null) merged.chart.width = width;
  if (height != null) merged.chart.height = height;
  if (labels) merged.labels = labels;
  if (xaxis) merged.xaxis = xaxis;
  if (yaxis) merged.yaxis = yaxis;
  if (colors) merged.colors = colors;
  if (series) merged.series = series;

  return merged;
}

function Chart(props: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    import("apexcharts").then(({ default: ApexCharts }) => {
      if (!mounted || !containerRef.current) return;

      const config = buildConfig(props);

      if (chartRef.current) {
        chartRef.current.updateOptions(config);
      } else {
        chartRef.current = new ApexCharts(containerRef.current, config);
        chartRef.current.render();
      }
    });

    return () => {
      mounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type, props.series, props.labels, props.options, props.width, props.height, props.colors]);

  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return <div ref={containerRef} />;
}

export default memo(Chart);
