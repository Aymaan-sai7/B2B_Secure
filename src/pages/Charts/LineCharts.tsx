// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/Card";
import Line from "../../components/Charts/Line";
import PageMeta from "../../components/common/PageMeta";

export default function LineChart() {
  return (
    <>
    <div>
      <PageMeta
        title="React.js Chart Dashboard"
        description="This is React.js Chart"
      />
      {/* <PageBreadcrumb pageTitle="Line Chart" /> */}
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <Line />
        </ComponentCard>
      </div>
      </div>
    </>
  );
}
