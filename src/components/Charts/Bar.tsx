import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string;
}

interface BarChartProps {
  labels?: string[];
  datasets?: Dataset[];
  title?: string;
  subtitle?: string;
}

// ── Defaults ───────────────────────────────────────────────────────────────────

const DEFAULT_LABELS   = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const DEFAULT_DATASETS: Dataset[] = [
  { label: "Completed Transactions",      data: [0,0,0,0,0,0], backgroundColor: "#04BE7B" },
  { label: "Failed/Blocked Transactions", data: [0,0,0,0,0,0], backgroundColor: "#FF4951" },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function BarChart({
  labels   = DEFAULT_LABELS,
  datasets = DEFAULT_DATASETS,
  title    = "Monthly Transactions",
  subtitle = "Completed vs Failed transactions per month",
}: BarChartProps) {

  // إجمالي كل الداتا
  const total = datasets.flatMap((d) => d.data).reduce((a, b) => a + b, 0);

  // peak month
  const monthlyTotals = labels.map((_, i) => datasets.reduce((sum, d) => sum + (d.data[i] || 0), 0));
  const peakIndex     = monthlyTotals.indexOf(Math.max(...monthlyTotals));
  const peakMonth     = labels[peakIndex] || "-";
  const peakValue     = monthlyTotals[peakIndex] || 0;

  // نسبة النمو بين آخر شهرين
  const lastTwo = monthlyTotals.slice(-2);
  const growth  = lastTwo[0] > 0 ? Number((((lastTwo[1] - lastTwo[0]) / lastTwo[0]) * 100).toFixed(1)) : null;
  const isUp    = (growth ?? 0) >= 0;

  const options: ApexOptions = {
    colors: datasets.map((d) => d.backgroundColor || "#12033A"),
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "bar",
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "45%", borderRadius: 4, borderRadiusApplication: "end" },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 3, colors: ["transparent"] },
    xaxis: {
      categories: labels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px", colors: "#9B9B9F" } },
    },
    yaxis: { labels: { style: { colors: ["#9B9B9F"] } } },
    legend: { show: false },
    grid: { yaxis: { lines: { show: true } }, borderColor: "#E7E6EB" },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val: number) => `${val.toLocaleString()} transactions` } },
  };

  const series = datasets.map((d) => ({ name: d.label, data: d.data }));

  return (
    <div className="rounded-2xl border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#FFFFFF] dark:bg-white/[0.03] p-5">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[#12033A] dark:text-[#F3F4F6]">{title}</h3>
          <p className="text-sm text-[#9B9B9F] mt-0.5">{subtitle}</p>
        </div>
        {growth !== null && (
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            isUp ? "bg-[#D8FFF1] text-[#04BE7B] dark:bg-[#0F2A22]" : "bg-[#FEDEDF] text-[#FF4951] dark:bg-[#2A1719]"
          }`}>
            {isUp ? "▲" : "▼"} {Math.abs(growth)}%
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-4">
        <div>
          <p className="text-xs text-[#9B9B9F] mb-0.5">Total</p>
          <p className="text-xl font-bold text-[#12033A] dark:text-[#F3F4F6]">{total.toLocaleString()}</p>
        </div>
        <div className="w-px h-8 bg-[#E7E6EB] dark:bg-[#5C5C5C]" />
        <div>
          <p className="text-xs text-[#9B9B9F] mb-0.5">Peak month</p>
          <p className="text-sm font-semibold text-[#12033A] dark:text-[#EDEDED]">
            {peakMonth} <span className="text-[#9B9B9F] font-normal">({peakValue.toLocaleString()})</span>
          </p>
        </div>
      </div>

      {/* Chart */}
      <Chart options={options} series={series} type="bar" height={180} />

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-[#E7E6EB] dark:border-[#5C5C5C]">
        {datasets.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.backgroundColor || "#12033A" }} />
            <span className="text-xs text-[#9B9B9F]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}