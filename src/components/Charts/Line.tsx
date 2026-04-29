import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function LineChartOne() {
  const options: ApexOptions = {
    legend: {
      show: false, 
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"], 
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line", 
      toolbar: {
        show: false, 
      },
    },
    stroke: {
      curve: "straight", 
      width: [2, 2], 
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, 
      strokeColors: "#fff", 
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, 
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false, 
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy", 
      },
    },
    xaxis: {
      type: "category", 
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",

      ],
      axisBorder: {
        show: false, 
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px", 
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: [180, 190, 170, 160, 175, 165, 170, 205],
    },
    {
      name: "Revenue",
      data: [40, 30, 50, 40, 55, 40, 70, 100],
    },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div id="chartEight" className="h-full w-full">
        <Chart options={options} series={series} type="area" height={280} />
      </div>
    </div>
  );
}
