import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface PieSlice {
  label: string;
  value: number;
  color: string;
  description: string; 
}

interface PieChartProps {
  slices?: PieSlice[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_SLICES: PieSlice[] = [
  {
    label: "Completed",
    value: 385,
    color: "#22C55E",
    description: "Successfully completed transactions",
  },
  {
    label: "Pending",
    value: 298,
    color: "#F59E0B",
    description: "Transactions awaiting processing",
  },
  {
    label: "Failed",
    value: 201,
    color: "#EF4444",
    description: "Transactions that failed or were rejected",
  },
  {
    label: "In Review",
    value: 168,
    color: "#12033A",
    description: "Under fraud detection review",
  },
];

export default function PieChart({
  slices = DEFAULT_SLICES,
  title = "Transaction Status",
  subtitle = "Breakdown by current status",
}: PieChartProps) {
  const total = slices.reduce((a, s) => a + s.value, 0);

  const options: ApexOptions = {
    colors: slices.map((s) => s.color),
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "pie",
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
    },
    labels: slices.map((s) => s.label),
    stroke: { show: true, width: 3, colors: ["#fff"] },
    legend: { show: false },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) =>
          `${val.toLocaleString()} (${((val / total) * 100).toFixed(1)}%)`,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      style: { fontSize: "12px", fontWeight: "600" },
      dropShadow: { enabled: false },
    },
  };

  const series = slices.map((s) => s.value);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Chart */}
        <div className="w-full sm:w-1/2 flex items-center justify-center">
          <Chart options={options} series={series} type="pie" height={240} />
        </div>

        <div className="w-full sm:w-1/2 space-y-3">
          {slices.map((slice, i) => {
            const pct = ((slice.value / total) * 100).toFixed(1);
            return (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {slice.label}
                    </span>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: slice.color,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {slice.value.toLocaleString()} — {slice.description}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="pt-3 mt-1 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Total transactions
              </span>
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}































