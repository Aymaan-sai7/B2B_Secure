import Metrics from "../../components/dash/Metrics";
import Company from "../../pages/CorePages/Company";
import PageMeta from "../../components/common/PageMeta";

import BarChart from "../../components/Charts/Bar";
import LineChart from "../../components/Charts/Line";
import PieChart from "../../components/Charts/Pie";
import {useDashboardCharts, useDashboardSummary} from "../../services/DashboardService"; 
export default function Dash() {
  const { charts } = useDashboardCharts();
  const { data: summaryData, loading: summaryLoading } = useDashboardSummary();

// وتمرره للـ Metrics
  return (
    <>
      <PageMeta title="Dashboard B2B" description="Dashboard" />

      <div className="grid grid-cols-12 gap-4 md:gap-6">

        {/*   Metrics */}
        <div className="col-span-12">
          <Metrics data={summaryData} loading={summaryLoading} />
        </div>

        {/*  Bar - Mini Companies */}
        <div className="col-span-12 xl:col-span-7">
          <BarChart
            labels={charts?.bar_chart.labels}
            datasets={charts?.bar_chart.datasets as any}
          />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <Company variant="mini" limit={4} />
        </div>

        {/*  Pie - Line  */}
        <div className="col-span-12 xl:col-span-5">
          <PieChart
            labels={charts?.pie_chart.labels}
            datasets={charts?.pie_chart.datasets as any}
          />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <LineChart
            labels={charts?.line_chart.labels}
            datasets={charts?.line_chart.datasets?.map((item) => ({
  ...item,
  label: item.label || "",
}))}
          />
        </div>

      </div>
    </>
  );
}