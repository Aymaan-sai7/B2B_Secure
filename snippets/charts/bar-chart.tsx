import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

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

const DEFAULT_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const DEFAULT_DATASETS: Dataset[] = [
  { label: "Completed", data: [0, 0, 0, 0, 0, 0], backgroundColor: "#04BE7B" },
  { label: "Failed", data: [0, 0, 0, 0, 0, 0], backgroundColor: "#FF4951" },
];

export default function BarChart({
  labels = DEFAULT_LABELS,
  datasets = DEFAULT_DATASETS,
  title = "Monthly Transactions",
  subtitle = "Completed vs failed transactions",
}: BarChartProps) {
  const series = datasets.map((dataset) => ({ name: dataset.label, data: dataset.data }));

  const options: ApexOptions = {
    chart: { toolbar: { show: false }, animations: { enabled: true, speed: 600 } },
    plotOptions: { bar: { horizontal: false, columnWidth: "45%", borderRadius: 4 } },
    colors: datasets.map((dataset) => dataset.backgroundColor || "#12033A"),
    dataLabels: { enabled: false },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: ["#9B9B9F"] } } },
    tooltip: { y: { formatter: (value) => `${value.toLocaleString()} transactions` } },
    grid: { borderColor: "#E7E6EB" },
  };

  return (
    <div className="rounded-2xl border border-[#E7E6EB] dark:border-[#5C5C5C] bg-white dark:bg-white/[0.03] p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-semibold text-[#12033A] dark:text-[#F3F4F6]">{title}</h3>
          <p className="text-sm text-[#9B9B9F] mt-0.5">{subtitle}</p>
        </div>
      </div>
      <Chart options={options} series={series} type="bar" height={240} />
    </div>
  );
}
