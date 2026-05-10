import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineSeries {
  name: string;
  data: number[];
  color: string;
  description: string; 
}

interface LineChartProps {
  series?: LineSeries[];
  categories?: string[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_SERIES: LineSeries[] = [
  {
    name: "Sales",
    data: [180, 190, 170, 160, 175, 165, 170, 205],
    color: "#12033A",
    description: "Total sales value in USD",
  },
  {
    name: "Revenue",
    data: [40, 30, 50, 40, 55, 40, 70, 100],
    color: "#9CB9FF",
    description: "Net revenue after deductions",
  },
];

const DEFAULT_CATEGORIES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export default function LineChart({
  series = DEFAULT_SERIES,
  categories = DEFAULT_CATEGORIES,
  title = "Sales vs Revenue",
  subtitle = "Performance comparison over time",
}: LineChartProps) {
  const totals = series.map((s) => ({
    name: s.name,
    color: s.color,
    description: s.description,
    total: s.data.reduce((a, b) => a + b, 0),
    latest: s.data[s.data.length - 1],
    prev: s.data[s.data.length - 2],
  }));

  const options: ApexOptions = {
    legend: { show: false },
    colors: series.map((s) => s.color),
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "line",
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
    },
    stroke: { curve: "smooth", width: series.map(() => 2) },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.45, opacityTo: 0 },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      borderColor: "#F3F4F6",
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      y: { formatter: (val: number) => `$${val.toLocaleString()}` },
    },
    xaxis: {
      type: "category",
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px", colors: "#9CA3AF" } },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: ["#9CA3AF"] },
        formatter: (val: number) => `$${val}`,
      },
    },
  };

  const apexSeries = series.map((s) => ({ name: s.name, data: s.data }));

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-6 mb-4 flex-wrap">
        {totals.map((t, i) => {
          const growth = t.prev > 0 ? ((t.latest - t.prev) / t.prev) * 100 : 0;
          const isUp = growth >= 0;
          return (
            <div key={i} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: t.color }}
              />
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                  {t.name}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    ${t.total.toLocaleString()}
                  </p>
                  <span
                    className={`text-xs font-medium ${
                      isUp ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {isUp ? "▲" : "▼"} {Math.abs(growth).toFixed(1)}%
                  </span>
                </div>
              </div>
              {i < totals.length - 1 && (
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 ml-3" />
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full">
        <Chart options={options} series={apexSeries} type="area" height={280} />
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        {totals.map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-8 h-0.5 inline-block rounded-full"
              style={{ backgroundColor: t.color }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {t.name}
              </span>{" "}
              — {t.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


















