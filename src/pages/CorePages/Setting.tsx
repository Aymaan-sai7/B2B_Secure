import PageMeta from "../../components/common/PageMeta";
import { LanguageToggle } from "../../components/common/LanguageToggle";
import { ThemeToggleButton } from "../../components/common/ThemeToggle";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../../services/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

type LogStatus = "Completed" | "Pending" | "Failed";

interface LogApiResponse {
  id: number;
  user_id: number;
  action: string;
  description: string;
  ip_address: string;
  created_at: string;
}

interface LogEntry extends LogApiResponse {
  status: LogStatus;
}

// helper
function inferStatus(action: string): LogStatus {
  const lower = action.toLowerCase();
  if (lower.includes("approved") || lower.includes("created") || lower.includes("success") || lower.includes("login"))
    return "Completed";
  if (lower.includes("failed") || lower.includes("rejected") || lower.includes("error") || lower.includes("denied"))
    return "Failed";
  return "Pending";
}
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: LogStatus }) {
  const styles: Record<LogStatus, React.CSSProperties> = {
    Completed: { backgroundColor: "#D8FFF1", color: "#04BE7B" },
    Pending:   { backgroundColor: "#FCFFCD", color: "#D2D200" },
    Failed:    { backgroundColor: "#FEDEDF", color: "#FF0004" },
  };
  const icons: Record<LogStatus, string> = {
    Completed: "", Pending: "", Failed: "",
  };
  return (
    <span
      style={styles[status]}
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
    >
      {icons[status]} {status}
    </span>
  );
}

function FilterBtn({
  label, count, active, color, onClick,
}: { label: string; count: number; active: boolean; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={active ? { backgroundColor: color, color: "#fff", borderColor: color } : {}}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
        active
          ? ""
          : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      {label} <span className="ml-1 opacity-75">({count})</span>
    </button>
  );
}

export default function Settings() {
  const [logs, setLogs]       = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState<"All" | LogStatus>("All");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/audit-logs");
        const formatted: LogEntry[] = res.data.data.data.map((l: LogApiResponse) => ({
          ...l,
          status: inferStatus(l.action),
        }));
        setLogs(formatted);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filtered = logs
  .filter((l) => filter === "All" || l.status === filter)
  .filter((l) =>
    l.action?.toLowerCase().includes(search.toLowerCase()) ||
    l.description?.toLowerCase().includes(search.toLowerCase()) ||
    l.ip_address?.includes(search)
  );

  const stats = {
    total:     logs.length,
    Completed: logs.filter((l) => l.status === "Completed").length,
    Pending:   logs.filter((l) => l.status === "Pending").length,
    Failed:    logs.filter((l) => l.status === "Failed").length,
  };

  const filterConfig: { label: string; value: "All" | LogStatus; color: string }[] = [
    { label: "All",       value: "All",       color: "#12033A" },
    { label: "Completed", value: "Completed", color: "#04BE7B" },
    { label: "Pending",   value: "Pending",   color: "#D2D200" },
    { label: "Failed",    value: "Failed",    color: "#FF0004" },
  ];

  return (
    <>
      <PageMeta title="Settings" description="System settings and activity logs" />
      <div className="space-y-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">System Settings</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Manage your dashboard preferences</p>
          </div>
          <div className="px-6 py-2 divide-y divide-gray-100 dark:divide-gray-800">
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Language</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Choose your preferred display language</p>
              </div>
              <LanguageToggle />
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Theme</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Light or dark mode</p>
              </div>
              <ThemeToggleButton/>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white">Activity Logs</h3>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">System-wide audit trail</p>
              </div>
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search action, description, IP..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#12033A] dark:focus:border-[#0047FF] transition-colors"
                />
              </div>
            </div>

            {/* filter button */}
            <div className="flex flex-wrap gap-2 mt-4">
              {filterConfig.map((f) => (
                <FilterBtn
                  key={f.value}
                  label={f.label}
                  count={f.value === "All" ? stats.total : stats[f.value as LogStatus]}
                  active={filter === f.value}
                  color={f.color}
                  onClick={() => setFilter(f.value)}
                />
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02]">
                  {["Log ID", "Action", "IP Address", "Date", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-24" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <p className="text-gray-400 dark:text-gray-500 text-sm">No logs found</p>
                      {search && (
                        <button onClick={() => setSearch("")} className="text-xs text-[#0047FF] mt-1 hover:underline">
                          Clear search
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filtered.map((log , index) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3 text-gray-400 dark:text-gray-500 font-mono text-xs whitespace-nowrap">
                        {index +1}
                      </td>
                  
                      <td className="px-6 py-3 text-gray-800 dark:text-white font-medium whitespace-nowrap">
                        {log.action}
                      </td>
                      
                      <td className="px-6 py-3 text-gray-400 dark:text-gray-500 font-mono text-xs whitespace-nowrap">
                        {log.ip_address}
                      </td>
                      <td className="px-6 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">
                        {formatDate(log.created_at)}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <StatusBadge status={log.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* footer */}
          <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-600 dark:text-gray-300">{filtered.length}</span>
              {" "}of{" "}
              <span className="font-medium text-gray-600 dark:text-gray-300">{stats.total}</span>
              {" "}logs
            </p>
            <span className="text-xs text-gray-400 dark:text-gray-500 italic">Read only</span>
          </div>
        </motion.div>

      </div>
    </>
  );
}