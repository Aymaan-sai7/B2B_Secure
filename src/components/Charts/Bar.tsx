
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// ── Types ────────────────────────────────────────────────────────────────────
interface BarChartProps {

  data?: number[];
  categories?: string[];
  title?: string;
  subtitle?: string;
  total?: number;
  growth?: number;
}

const DEFAULT_DATA = [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112];
const DEFAULT_CATEGORIES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function BarChart({
  data = DEFAULT_DATA,
  categories = DEFAULT_CATEGORIES,
  title = "Monthly Transactions",
  subtitle = "Total transactions per month",
  total,
  growth,
}: BarChartProps) {
  const computedTotal = total ?? data.reduce((a, b) => a + b, 0);
  const peak = Math.max(...data);
  const peakMonth = categories[data.indexOf(peak)];
  const isPositiveGrowth = (growth ?? 0) >= 0;

  const options: ApexOptions = {
    colors: ["#12033A"],
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px", colors: "#9CA3AF" } },
    },
    yaxis: { labels: { style: { colors: ["#9CA3AF"] } } },
    legend: { show: false },
    grid: { yaxis: { lines: { show: true } }, borderColor: "#F3F4F6" },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: true },
      y: { formatter: (val: number) => `${val.toLocaleString()} transactions` },
    },
  };

  const series = [{ name: "Transactions", data }];

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
            {subtitle}
          </p>
        </div>
        {growth !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              isPositiveGrowth
                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {isPositiveGrowth ? "▲" : "▼"} {Math.abs(growth)}%
          </span>
        )}
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Total</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {computedTotal.toLocaleString()}
          </p>
        </div>
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Peak month</p>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {peakMonth}{" "}
            <span className="text-gray-400 font-normal">({peak.toLocaleString()})</span>
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Chart options={options} series={series} type="bar" height={180} />
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <span className="w-3 h-3 rounded-sm bg-[#12033A] inline-block" />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Transactions — monthly count across all companies
        </span>
      </div>
    </div>
  );
}





























