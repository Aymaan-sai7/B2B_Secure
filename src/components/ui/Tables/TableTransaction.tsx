import { useState, useRef, useEffect } from "react";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";
import Badge from "../Badge";
import { transaction } from "../../../interfaces/Transaction";

interface Props {
  data: transaction[];
  onEdit: (t: transaction) => void;
  onDelete: (id: number) => void;
  onRowClick: (id: number) => void;
}

//   Action dropdown
function ActionMenu({
  transaction,
  onEdit,
  onDelete,
}: {
  transaction: transaction;
  onEdit: (t: transaction) => void;
  onDelete: (id: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">("top");


  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  const rect = e.currentTarget.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  setDropdownPosition(spaceBelow < 200 ? "bottom" : "top");
  setIsOpen((prev) => !prev);
};
      {/* الـ 3 نقط */}
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleToggle}
        className="p-1.5 rounded-lg text-[#9B9B9F] hover:text-[#12033A] hover:bg-[#F1F3FA] dark:hover:bg-white/5 dark:hover:text-[#F3F4F6] transition-colors"
        title="Actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 z-20 w-36 bg-[#FFFFFF] dark:bg-[#1E1E1E] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-xl shadow-lg overflow-hidden ${dropdownPosition === "top" ? "top-9" : "bottom-9"}`}>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(transaction); setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#12033A] dark:text-[#EDEDED] hover:bg-[#E1E3FF] dark:hover:bg-[#0F1C2E] hover:text-[#0047FF] dark:hover:text-[#4DA3FF] transition-colors"
          >
            <Edit2 size={14} />
            Edit
          </button>

          <div className="h-px bg-[#E7E6EB] dark:bg-[#5C5C5C]" />

          <button
            onClick={(e) => { e.stopPropagation(); onDelete(transaction.id); setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#FF4951] hover:bg-[#FEDEDF] dark:hover:bg-[#2A1719] transition-colors"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

//   Main Table
export default function TransactionTable({ data, onEdit, onDelete, onRowClick }: Props) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full">

        {/* Header */}
        <thead className="border-y border-[#E7E6EB] dark:border-[#5C5C5C]">
          <tr className="text-left">
            <th className="w-[60px] px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">ID</th>
            <th className=" px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">Sender</th>
            <th className="  px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">Receiver</th>
            <th className=" px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">Amount</th>
            <th className=" px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">Date</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">Status</th>
            <th className=" w-[60px] px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider text-center">Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-[#E7E6EB] dark:divide-[#5C5C5C]">
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-sm text-[#9B9B9F]">
                No transactions found
              </td>
            </tr>
          ) : (
            data.map((t, index) => (
              <tr
                key={t.id}
                className="cursor-pointer hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
                onClick={() => onRowClick(t.id)}
              >
                <td className="px-4 py-3 text-sm text-[#9B9B9F] font-mono">{index + 1}</td>
                <td className=" px-4 py-3 text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">{t.senderCompany}</td>
                <td className=" px-4 py-3 text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">{t.receiverCompany}</td>
                <td className=" px-4 py-3 text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">
                  ${Number(t.amountSend).toLocaleString()}
                </td>
                <td className=" px-4 py-3 text-sm text-[#9B9B9F] whitespace-nowrap">{t.date}</td>
                <td className="text-center px-4 py-3">
                  <Badge
                    size="sm"
                    color={
                      t.status === "completed" ? "success"
                      : t.status === "pending" ? "warning"
                      : "error"
                    }
                  >
                    {t.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-center">
                  <ActionMenu transaction={t} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}