import Metrics from "../components/dash/Metrics";
import BarChart from "./Charts/BarCarts";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";

// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import Alerts from "../components/dash/Alerts";
import Company from "../pages/Company";

// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../components/common/PageMeta";

import PieChart from "./Charts/PieCharts"
import LineChart from "./Charts/LineCharts"



export default function Dash() {
  return (
    <>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <Metrics />
        </div>






        <div className="col-span-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-7 h-full">
            <BarChart />
          </div>

          <div className="col-span-12 xl:col-span-5 h-full">
            <Company variant="mini" limit={3} />
          </div>
        </div>





        {/* <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div> */}



        <div className="col-span-12 grid grid-cols-12 gap-6">
          <div className="h-[400px] col-span-12 xl:col-span-4">
            <PieChart />
          </div>
          <div className="h-[400px] col-span-12 xl:col-span-8 ">

            <LineChart />
          </div>

        </div>


        {/* <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}
      </div>
      <PageMeta
        title="Dashboard B2B"
        description="Dashboard"
      />
    </>
  );
}