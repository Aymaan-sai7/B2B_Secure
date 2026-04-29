import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function Pie() {
  const options: ApexOptions = {
colors: ["#465FFF", "#22C55E", "#F59E0B", "#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "pie",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
    },
    labels: ["Jan", "Feb", "Mar", "Apr"],
    
    stroke: {
      show: true,
      width: 4,
      colors: ["#fff"],
    },
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  };
const series = [168, 385, 201, 298];
  return (
  <div className="w-full h-full flex items-center justify-center">
    <div id="chartOne" className="h-full w-full">
      <Chart options={options} series={series} type="pie" height={280} />
    </div>
  </div>
);
}
