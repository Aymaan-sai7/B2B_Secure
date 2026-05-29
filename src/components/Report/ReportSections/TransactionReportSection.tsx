import { TransactionReportRow } from "../UseReport/TransactionUseReport";


function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const style =
    s === "completed" ? { bg: "#D8FFF1", color: "#04BE7B" }
    : s === "failed"  ? { bg: "#FEDEDF", color: "#FF4951" }
    :                   { bg: "#FFFCF1", color: "#E2AE21" };

  return (
    <span
      style={{ backgroundColor: style.bg, color: style.color }}
      className="px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap capitalize"
    >
      {status}
    </span>
  );
}

function AIBadge({ aiStatus }: { aiStatus: string }) {
  const clean = aiStatus.replace(/[✅❌]/g, "").trim().toLowerCase();
  const style =
    clean.includes("approved") ? { bg: "#D8FFF1", color: "#04BE7B" }
    : clean.includes("rejected") ? { bg: "#FEDEDF", color: "#FF4951" }
    :                               { bg: "#F1F3FA", color: "#9B9B9F" };

  return (
    <span
      style={{ backgroundColor: style.bg, color: style.color }}
      className="px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
    >
      {aiStatus.replace(/[✅❌]/g, "").trim() || "-"}
    </span>
  );
}


interface Props {
  rows: TransactionReportRow[];
  stats: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    aiApproved: number;
    aiRejected: number;
    highRisk: number;
  };
  handleDownloadCSV: () => void;
  handleDownloadPDF: () => void;
}


export default function TransactionReportSection({ rows, stats, handleDownloadCSV, handleDownloadPDF }: Props) {
  return (
    <>
      <p className="text-xs font-medium text-[#9B9B9F] uppercase tracking-wider mb-2">Transaction Status</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-[#F1F3FA] dark:bg-white/5 rounded-xl p-3">
          <p className="text-2xl font-bold text-[#12033A] dark:text-[#F3F4F6]">{stats.total}</p>
          <p className="text-xs text-[#9B9B9F]">Total</p>
        </div>
        <div className="bg-[#D8FFF1] dark:bg-[#0F2A22] rounded-xl p-3">
          <p className="text-2xl font-bold text-[#04BE7B]">{stats.completed}</p>
          <p className="text-xs text-[#04BE7B]">Completed</p>
        </div>
        <div className="bg-[#FFFCF1] dark:bg-[#2A2412] rounded-xl p-3">
          <p className="text-2xl font-bold text-[#E2AE21]">{stats.pending}</p>
          <p className="text-xs text-[#E2AE21]">Pending</p>
        </div>
        <div className="bg-[#FEDEDF] dark:bg-[#2A1719] rounded-xl p-3">
          <p className="text-2xl font-bold text-[#FF4951]">{stats.failed}</p>
          <p className="text-xs text-[#FF4951]">Failed</p>
        </div>
      </div>

      {/* AI Stats */}
      <p className="text-xs font-medium text-[#9B9B9F] uppercase tracking-wider mb-2">AI Fraud Detection</p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#D8FFF1] dark:bg-[#0F2A22] rounded-xl p-3">
          <p className="text-2xl font-bold text-[#04BE7B]">{stats.aiApproved}</p>
          <p className="text-xs text-[#04BE7B]">AI Approved</p>
        </div>
        <div className="bg-[#FEDEDF] dark:bg-[#2A1719] rounded-xl p-3">
          <p className="text-2xl font-bold text-[#FF4951]">{stats.aiRejected}</p>
          <p className="text-xs text-[#FF4951]">AI Rejected</p>
        </div>
        <div className="bg-[#FEDEDF] dark:bg-[#2A1719] rounded-xl p-3">
          <p className="text-2xl font-bold text-[#FF4951]">{stats.highRisk}</p>
          <p className="text-xs text-[#FF4951]">High Risk (≥65)</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] overflow-hidden mb-5">
        <div className="px-4 py-2.5 border-b border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#F1F3FA] dark:bg-white/5">
          <p className="text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
            Preview — latest {Math.min(5, rows.length)} transactions
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E7E6EB] dark:border-[#5C5C5C]">
                {["Sender", "Receiver", "Status", "AI", "Risk", "Date"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#9B9B9F] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E6EB] dark:divide-[#5C5C5C]">
              {rows.slice(0, 5).map((row, i) => (
                <tr key={i} className="hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-[#12033A] dark:text-[#EDEDED] whitespace-nowrap">{row.Sender}</td>
                  <td className="px-4 py-2.5 text-[#9B9B9F] whitespace-nowrap">{row.Receiver}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap"><StatusBadge status={row.Status} /></td>
                  <td className="px-4 py-2.5 whitespace-nowrap"><AIBadge aiStatus={row["AI Status"]} /></td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span className={`text-xs font-semibold ${Number(row["AI Risk Score"]) >= 65 ? "text-[#FF4951]" : "text-[#9B9B9F]"}`}>
                      {row["AI Risk Score"]}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[#9B9B9F] text-xs whitespace-nowrap">
                    {new Date(row.Date).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length > 5 && (
          <div className="px-4 py-2 border-t border-[#E7E6EB] dark:border-[#5C5C5C]">
            <p className="text-xs text-[#9B9B9F] text-center">+{rows.length - 5} more — download to see all</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={handleDownloadCSV}
          className="flex-1 h-11 text-sm rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] text-[#12033A] dark:text-[#EDEDED] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download CSV
        </button>
        <button onClick={handleDownloadPDF}
          className="flex-1 h-11 text-sm rounded-xl bg-[#12033A] text-white hover:bg-[#1e0a5e] transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Download PDF
        </button>
      </div>
    </>
  );
}