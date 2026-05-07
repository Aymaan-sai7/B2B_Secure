import ComponentCard from "../../components/common/Card";
import Pie from "../../components/Charts/Pie";
import PageMeta from "../../components/common/PageMeta";

export default function PieChart() {
  return (
    <div>
      <PageMeta
        title="React.js Chart Dashboard"
        description="This is React.js Chart"
      />
      {/* <PageBreadcrumb pageTitle="Pie Chart" /> */}
      <div className="space-y-6">
        <ComponentCard title="Pie Chart 1">
          <Pie />
        </ComponentCard>
      </div>
    </div>
  );
}
