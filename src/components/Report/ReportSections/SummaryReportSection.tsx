import { SummaryReportData } from "../UseReport/SummaryUseReport";

interface Props {
  data: SummaryReportData;
  handleDownloadPDF: (d: SummaryReportData) => void;
}

function StatCard({ value, label, color }: { value: string | number; label: string; color?: string }) {
  return (
    <div className="bg-[#F1F3FA] dark:bg-white/5 rounded-xl p-3">
      <p className="text-2xl font-bold" style={{ color: color || "#12033A" }}>{value}</p>
      <p className="text-xs text-[#9B9B9F]">{label}</p>
    </div>
  );
}

export default function SummaryReportSection({ data: d, handleDownloadPDF }: Props) {
  return (
    <>
      {/* Companies */}
      <p className="text-xs font-medium text-[#9B9B9F] uppercase tracking-wider mb-2">Companies</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard value={d.companies.total}     label="Total" />
        <StatCard value={d.companies.approved}  label="Approved"  color="#04BE7B" />
        <StatCard value={d.companies.pending}   label="Pending"   color="#E2AE21" />
        <StatCard value={d.companies.suspended} label="Suspended" color="#FF4951" />
      </div>

      {/* Transactions */}
      <p className="text-xs font-medium text-[#9B9B9F] uppercase tracking-wider mb-2">Transactions</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <StatCard value={d.transactions.total}     label="Total" />
        <StatCard value={d.transactions.completed} label="Completed" color="#04BE7B" />
        <StatCard value={d.transactions.pending}   label="Pending"   color="#E2AE21" />
        <StatCard value={d.transactions.failed}    label="Failed"    color="#FF4951" />
        <StatCard value={d.transactions.blocked}   label="Blocked"   color="#FF4951" />
        <StatCard value={`$${d.transactions.total_volume.toLocaleString()}`} label="Total Volume" />
      </div>

      {/* Fraud Detection */}
      <p className="text-xs font-medium text-[#9B9B9F] uppercase tracking-wider mb-2">Fraud Detection</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatCard value={d.fraud_detection.clean}      label="Clean"      color="#04BE7B" />
        <StatCard value={d.fraud_detection.suspicious} label="Suspicious" color="#E2AE21" />
        <StatCard value={d.fraud_detection.fraud}      label="Fraud"      color="#FF4951" />
      </div>

      {/* Admins */}
      <p className="text-xs font-medium text-[#9B9B9F] uppercase tracking-wider mb-2">Admins</p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard value={d.admins.total}          label="Total" />
        <StatCard value={d.admins.super_admins}   label="Super Admins" />
        <StatCard value={d.admins.regular_admins} label="Regular Admins" />
      </div>

      {/* Download */}
      <button
        onClick={() => handleDownloadPDF(d)}
        className="w-full h-11 text-sm rounded-xl bg-[#12033A] text-white hover:bg-[#1e0a5e] transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Download PDF
      </button>
    </>
  );
}