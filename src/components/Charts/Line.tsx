import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Dataset {
  label: string;
  data: number[];
  borderColor?: string;
}

interface LineChartProps {
  labels?: string[];
  datasets?: Dataset[];
  title?: string;
  subtitle?: string;
}

// ── Color helper ───────────────────────────────────────────────────────────────

function css(variable: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

function getChartColors() {
  return {
    primary: css("--color-secondary"),
  };
}

// ── Defaults ───────────────────────────────────────────────────────────────────

const DEFAULT_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

// ── Component ──────────────────────────────────────────────────────────────────

export default function LineChart({
  labels   = DEFAULT_LABELS,
  datasets,
  title    = "Transaction Trends",
  subtitle = "Total transactions over time",
}: LineChartProps) {

  const c = getChartColors();

  const resolvedDatasets: Dataset[] = datasets ?? [
    { label: "Total Transactions", data: [0,0,0,0,0,0], borderColor: c.primary },
  ];

  const seriesStats = resolvedDatasets.map((d) => {
    const total  = d.data.reduce((a, b) => a + b, 0);
    const latest = d.data[d.data.length - 1]
const prev = d.data[d.data.length - 2]
    const growth = prev > 0 ? Number((((latest - prev) / prev) * 100).toFixed(1)) : null;
    return { ...d, total, growth };
  });

  const options: ApexOptions = {
    legend: { show: false },
    colors: resolvedDatasets.map((d) => d.borderColor || c.primary),
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "line",
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
    },
    stroke: { curve: "smooth", width: resolvedDatasets.map(() => 2) },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.4, opacityTo: 0 },
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
      borderColor: "#E7E6EB",
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      y: { formatter: (val: number) => `${val.toLocaleString()} transactions` },
    },
    xaxis: {
      type: "category",
      categories: labels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px", colors: "#9B9B9F" } },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", colors: ["#9B9B9F"] } },
    },
  };

  const series = resolvedDatasets.map((d) => ({ name: d.label, data: d.data }));

  return (
    <div className="rounded-2xl border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#FFFFFF] dark:bg-white/[0.03] p-5">

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#12033A] dark:text-[#F3F4F6]">{title}</h3>
        <p className="text-sm text-[#9B9B9F] mt-0.5">{subtitle}</p>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-6 mb-4">
        {seriesStats.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.borderColor || c.primary }} />
            <div>
              <p className="text-xs text-[#9B9B9F] mb-0.5">{s.label}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-[#12033A] dark:text-[#F3F4F6]">
                  {s.total.toLocaleString()}
                </p>
                {s.growth !== null && (
                  <span className={`text-xs font-medium ${s.growth >= 0 ? "text-[#04BE7B]" : "text-[#FF4951]"}`}>
                    {s.growth >= 0 ? "▲" : "▼"} {Math.abs(s.growth)}%
                  </span>
                )}
              </div>
            </div>
            {i < seriesStats.length - 1 && (
              <div className="w-px h-8 bg-[#E7E6EB] dark:bg-[#5C5C5C] ml-3" />
            )}
          </div>
        ))}
      </div>

      {/* Chart */}
      <Chart options={options} series={series} type="area" height={260} />

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-[#E7E6EB] dark:border-[#5C5C5C]">
        {resolvedDatasets.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-8 h-0.5 inline-block rounded-full" style={{ backgroundColor: d.borderColor || c.primary }} />
            <span className="text-xs text-[#9B9B9F]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}