import ComponentCard from "../../components/common/Card";
import BarChartOne from "../../components/Charts/Bar";
import PageMeta from "../../components/common/PageMeta";

export default function BarChart() {
  return (
    <div>
      <PageMeta
        title="React.js Chart Dashboard"
        description="This is React.js Chart Dashboard "
      />
      {/* <PageBreadcrumb pageTitle="Bar Chart" /> */}
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
