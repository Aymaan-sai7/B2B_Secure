import { Building2, CreditCard, ShieldAlert, Clock } from "lucide-react";
import { DashboardSummary } from "../../services/DashboardService";

interface Props {
  data: DashboardSummary | null;
  loading: boolean;
}

// ── Metric Card ────────────────────────────────────────────────────────────────

function MetricCard({
  icon,
  label,
  value,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E7E6EB] bg-[#FFFFFF] p-5 dark:border-[#5C5C5C] dark:bg-white/[0.03] md:p-6">
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div className="mt-5">
        <span className="text-sm" style={{ color: iconColor }}>{label}</span>
        <h4 className="mt-2 font-bold text-2xl text-[#12033A] dark:text-[#F3F4F6]">{value}</h4>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function Metrics({ data, loading }: Props) {

  // Skeleton
  if (loading || !data) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-[#F1F3FA] dark:bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

      {/* Total Companies */}
      <MetricCard
        icon={<Building2 size={22} />}
        label="Companies"
        value={data.companies.total}
        iconBg="#D8FFF1"
        iconColor="#04BE7B"
      />

      {/* Total Transactions */}
      <MetricCard
        icon={<CreditCard size={22} />}
        label="Transactions"
        value={data.transactions.total_count}
        iconBg="#E1E3FF"
        iconColor="#0047FF"
      />

      {/* Pending Companies */}
      <MetricCard
        icon={<Clock size={22} />}
        label="Pending Companies"
        value={data.companies.pending}
        iconBg="#FFFCF1"
        iconColor="#E2AE21"
      />

      {/* Fraud Rate */}
      <MetricCard
        icon={<ShieldAlert size={22} />}
        label="Fraud Rate"
        value={`${data.transactions.fraud_rate.toFixed(1)}%`}
        iconBg="#FEDEDF"
        iconColor="#FF4951"
      />

    </div>
  );
}