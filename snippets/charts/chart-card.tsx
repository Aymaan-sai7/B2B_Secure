import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function ChartCard({ title, subtitle, footer, children }: ChartCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
      <div>{children}</div>
      {footer && <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{footer}</div>}
    </div>
  );
}
