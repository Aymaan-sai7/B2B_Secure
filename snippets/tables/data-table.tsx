import type { ReactNode } from "react";

export interface Column<T> {
  id: string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  emptyText?: string;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => ReactNode;
}

export default function DataTable<T>({
  columns,
  rows,
  loading = false,
  emptyText = "No data available.",
  onRowClick,
  actions,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">Loading data...</div>
    );
  }

  if (!rows.length) {
    return (
      <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">{emptyText}</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
      <table className="min-w-full text-left">
        <thead className="bg-[#F8F8FB] dark:bg-[#111827]">
          <tr>
            {columns.map((column) => (
              <th key={column.id} className={`px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 ${column.className ?? ""}`}>
                {column.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 ${onRowClick ? "cursor-pointer" : ""}`}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <td key={column.id} className={`px-4 py-4 text-sm text-gray-600 dark:text-gray-300 ${column.className ?? ""}`}>
                  {column.render ? column.render(row) : (row as any)[column.id]}
                </td>
              ))}
              {actions && <td className="px-4 py-4">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
