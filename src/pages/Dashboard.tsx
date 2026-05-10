import Metrics from "../components/dash/Metrics";
import PageMeta from "../components/common/PageMeta";
import Company from "../pages/Company";


import BarChart from "../components/Charts/Bar";
import LineChart from "../components/Charts/Line";
import PieChart from "../components/Charts/Pie";


export default function Dash() {

  return (
    <>

      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12">
          <Metrics />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <BarChart />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <Company variant="mini" limit={5} />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <PieChart />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <LineChart />
        </div>
        <PageMeta title="Dashboard B2B" description="Dashboard" />
      </div>
    </>
  );
}