import { CompanyReportRow } from "../UseReport/CompanyUseReport";

function DonutChart({ approved, pending, total }: { approved: number; pending: number; total: number }) {
  if (total === 0) return null;

  const size = 100;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const approvedPct = approved / total;
  const pendingPct = pending / total;
  

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={50} cy={50} r={radius} fill="none" stroke="#F1F3FA" strokeWidth={14} />
      <circle
        cx={50} cy={50} r={radius} fill="none"
        stroke="#04BE7B" strokeWidth={14}
        strokeDasharray={`${approvedPct * circumference} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <circle
        cx={50} cy={50} r={radius} fill="none"
        stroke="#E2AE21" strokeWidth={14}
        strokeDasharray={`${pendingPct * circumference} ${circumference}`}
        strokeDashoffset={`-${approvedPct * circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x={50} y={46} textAnchor="middle" className="fill-[#12033A] dark:fill-[#EDEDED]" fontSize={14} fontWeight="bold">{total}</text>
      <text x={50} y={60} textAnchor="middle" fill="#9B9B9F" fontSize={8}>total</text>
    </svg>
  );
}
export default function ReportSections({
   rows,
  stats,
  handleDownloadCSV,
  handleDownloadPDF,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">

                  <div className="flex items-center justify-center sm:w-32">
                    <DonutChart approved={stats.approved} pending={stats.pending} total={stats.total} />
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="bg-[#F1F3FA] dark:bg-white/5 rounded-xl p-3">
                      <p className="text-2xl font-bold text-[#12033A] dark:text-[#F3F4F6]">{stats.total}</p>
                      <p className="text-xs text-[#9B9B9F]">Total companies</p>
                    </div>
                    <div className="bg-[#D8FFF1] dark:bg-[#0F2A22] rounded-xl p-3">
                      <p className="text-2xl font-bold text-[#04BE7B]">{stats.approved}</p>
                      <p className="text-xs text-[#04BE7B]">Approved</p>
                    </div>
                    <div className="bg-[#FFFCF1] dark:bg-[#2A2412] rounded-xl p-3">
                      <p className="text-2xl font-bold text-[#E2AE21]">{stats.pending}</p>
                      <p className="text-xs text-[#E2AE21]">Pending</p>
                    </div>
                    <div className="bg-[#E1E3FF] dark:bg-[#0F1C2E] rounded-xl p-3">
                      <p className="text-2xl font-bold text-[#0047FF]">{stats.verified}</p>
                      <p className="text-xs text-[#0047FF]">Verified</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#04BE7B]" />
                    <span className="text-xs text-[#9B9B9F]">Approved ({Math.round((stats.approved / stats.total) * 100) || 0}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#E2AE21]" />
                    <span className="text-xs text-[#9B9B9F]">Pending ({Math.round((stats.pending / stats.total) * 100) || 0}%)</span>
                  </div>
                </div>

                <div className="rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] overflow-hidden mb-5">
                  <div className="px-4 py-2.5 border-b border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#F1F3FA] dark:bg-white/5">
                    <p className="text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
                      Preview — latest {Math.min(5, rows.length)} companies
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#E7E6EB] dark:border-[#5C5C5C]">
                          {["Name", "Industry", "Approved", "Verified", "Date"].map((h) => (
                            <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#9B9B9F] whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E7E6EB] dark:divide-[#5C5C5C]">
                        {rows.slice(0, 5).map((row : CompanyReportRow, i: number) => (
                          <tr key={i} className="hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors">
                            <td className="px-4 py-2.5 font-medium text-[#12033A] dark:text-[#EDEDED] whitespace-nowrap">{row.Name}</td>
                            <td className="px-4 py-2.5 text-[#9B9B9F] whitespace-nowrap">{row.Industry || "-"}</td>
                            <td className="px-4 py-2.5 whitespace-nowrap">
                              <span style={{
                                backgroundColor: row["Is Approved"] === "Yes" ? "#D8FFF1" : "#FEDEDF",
                                color: row["Is Approved"] === "Yes" ? "#04BE7B" : "#FF4951",
                              }} className="px-2 py-0.5 rounded-full text-xs font-medium">
                                {row["Is Approved"] === "Yes" ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 whitespace-nowrap">
                              <span style={{
                                backgroundColor: row["Is Verified"] === "Yes" ? "#E1E3FF" : "#F1F3FA",
                                color: row["Is Verified"] === "Yes" ? "#0047FF" : "#9B9B9F",
                              }} className="px-2 py-0.5 rounded-full text-xs font-medium">
                                {row["Is Verified"] === "Yes" ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-[#9B9B9F] text-xs whitespace-nowrap">
                              {new Date(row["Date Registered"]).toLocaleDateString("en-GB")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {rows.length > 5 && (
                    <div className="px-4 py-2 border-t border-[#E7E6EB] dark:border-[#5C5C5C]">
                      <p className="text-xs text-[#9B9B9F] text-center">
                        +{rows.length - 5} more companies — download to see all
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadCSV}
                    className="flex-1 h-11 text-sm rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] text-[#12033A] dark:text-[#EDEDED] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download CSV
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex-1 h-11 text-sm rounded-xl bg-[#12033A] text-white hover:bg-[#1e0a5e] transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </>)}