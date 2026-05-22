import { AdminReportRow } from "../UseReport/AdminUseReport";

// ── Props ──────────────────────────────────────────────────────────────────────

interface Props {
  rows: AdminReportRow[];
  stats: {
    total: number;
    superAdmin: number;
    admin: number;
  };
  handleDownloadCSV: () => void;
  handleDownloadPDF: () => void;
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function AdminReportSection({ rows, stats, handleDownloadCSV, handleDownloadPDF }: Props) {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#F1F3FA] dark:bg-white/5 rounded-xl p-3">
          <p className="text-2xl font-bold text-[#12033A] dark:text-[#F3F4F6]">{stats.total}</p>
          <p className="text-xs text-[#9B9B9F]">Total admins</p>
        </div>
        <div className="bg-[#DBDDFF] dark:bg-[#0F1C2E] rounded-xl p-3">
          <p className="text-2xl font-bold text-[#12033A] dark:text-[#4DA3FF]">{stats.superAdmin}</p>
          <p className="text-xs text-[#12033A] dark:text-[#4DA3FF]">Super Admin</p>
        </div>
        <div className="bg-[#E1E3FF] dark:bg-[#0F1C2E] rounded-xl p-3">
          <p className="text-2xl font-bold text-[#0047FF]">{stats.admin}</p>
          <p className="text-xs text-[#0047FF]">Admin</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] overflow-hidden mb-5">
        <div className="px-4 py-2.5 border-b border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#F1F3FA] dark:bg-white/5">
          <p className="text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
            All admins ({stats.total})
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E7E6EB] dark:border-[#5C5C5C]">
              {["Name", "Email", "Role", "Created"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#9B9B9F] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E6EB] dark:divide-[#5C5C5C]">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors">
                <td className="px-4 py-2.5 font-medium text-[#12033A] dark:text-[#EDEDED] whitespace-nowrap">{row.Name}</td>
                <td className="px-4 py-2.5 text-[#9B9B9F] whitespace-nowrap">{row.Email}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#DBDDFF] text-[#12033A] dark:bg-[#0F1C2E] dark:text-[#4DA3FF]">
                    {row.Roles}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-[#9B9B9F] text-xs whitespace-nowrap">
                  {new Date(row["Created At"]).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download buttons */}
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