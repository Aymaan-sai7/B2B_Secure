import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Dataset {
  data: number[];
  backgroundColor: string[];
}

interface PieChartProps {
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
    success: css("--color-onSuccessContainer"),
    warning: css("--color-onWarningContainer"),
    error:   css("--color-onErrorContainer"),
    primary: css("--color-secondary"),
  };
}

// ── Defaults ───────────────────────────────────────────────────────────────────

const DEFAULT_LABELS = ["Completed", "Pending", "Failed", "Blocked"];

// ── Component ──────────────────────────────────────────────────────────────────

export default function PieChart({
  labels   = DEFAULT_LABELS,
  datasets,
  title    = "Transaction Status",
  subtitle = "Breakdown by current status",
}: PieChartProps) {

  const c = getChartColors();

  const resolvedDatasets: Dataset[] = datasets ?? [{
    data: [0, 0, 0, 0],
    backgroundColor: [c.success, c.warning, c.error, c.primary],
  }];

  const values = resolvedDatasets[0]?.data ?? [];
  const colors = resolvedDatasets[0]?.backgroundColor ?? [c.success, c.warning, c.error, c.primary];
  const total  = values.reduce((a, b) => a + b, 0);

  const options: ApexOptions = {
    colors,
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "pie",
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
    },
    labels,
    stroke: { show: true, width: 3, colors: ["#fff"] },
    legend: { show: false },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) =>
          `${val.toLocaleString()} (${total > 0 ? ((val / total) * 100).toFixed(1) : 0}%)`,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      style: { fontSize: "12px", fontWeight: "600" },
      dropShadow: { enabled: false },
    },
  };

  return (
    <div className="rounded-2xl border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#FFFFFF] dark:bg-white/[0.03] p-5">

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#12033A] dark:text-[#F3F4F6]">{title}</h3>
        <p className="text-sm text-[#9B9B9F] mt-0.5">{subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">

        {/* Chart */}
        <div className="w-full sm:w-1/2 flex items-center justify-center">
          <Chart options={options} series={values} type="pie" height={220} />
        </div>

        {/* Legend + progress bars */}
        <div className="w-full sm:w-1/2 space-y-3">
          {labels.map((label, i) => {
            const value = values[i] ?? 0;
            const pct   = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
            const color = colors[i] || "#9B9B9F";
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">{label}</span>
                    <span className="text-sm font-bold text-[#12033A] dark:text-[#F3F4F6]">{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#F1F3FA] dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                  <p className="text-xs text-[#9B9B9F] mt-1">
                    {value.toLocaleString()} transactions
                  </p>
                </div>
              </div>
            );
          })}

          {/* Total */}
          <div className="pt-3 border-t border-[#E7E6EB] dark:border-[#5C5C5C]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9B9B9F]">Total transactions</span>
              <span className="text-sm font-bold text-[#12033A] dark:text-[#F3F4F6]">{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}