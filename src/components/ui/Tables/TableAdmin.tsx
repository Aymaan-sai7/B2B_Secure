import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";
import { AdminType } from "../../../interfaces/Admin"

interface Props {
  data: AdminType[];
  onEdit: (admin: AdminType) => void;
  onDelete: (id: number) => void;
  onRowClick?: (id: number) => void;
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DBDDFF] text-[#12033A] dark:bg-[#0F1C2E] dark:text-[#4DA3FF]">
      {role}
    </span>
  );
}

function ActionMenu({
  admin, onEdit, onDelete,
}: {
  admin: AdminType;
  onEdit: (a: AdminType) => void;
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
            onClick={(e) => { e.stopPropagation(); onEdit(admin); setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#12033A] dark:text-[#EDEDED] hover:bg-[#E1E3FF] dark:hover:bg-[#0F1C2E] hover:text-[#0047FF] dark:hover:text-[#4DA3FF] transition-colors"
          >
            <Edit2 size={14} />
            Edit
          </button>
          <div className="h-px bg-[#E7E6EB] dark:bg-[#5C5C5C]" />
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(admin.id); setIsOpen(false); }}
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

export default function AdminTable({ data, onEdit, onDelete, onRowClick, }: Props) {
  const { t } = useTranslation();

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full">

        {/* Header */}
        <thead className="border-y border-[#E7E6EB] dark:border-[#5C5C5C]">
          <tr className="text-left">
            <th className="w-[60px] px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">{t("id")}</th>
            <th className="px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">{t("name")}</th>
            <th className="px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">{t("email")}</th>
            <th className="px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">{t("role")}</th>
            <th className="px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">{t("createAt")}</th>
            <th className="w-[60px] px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider text-center">{t("action")}</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-[#E7E6EB] dark:divide-[#5C5C5C]">
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#9B9B9F]">No admins found</td>
            </tr>
          ) : (
            data.map((admin, index) => (
              <tr key={admin.id} onClick={() => onRowClick?.(admin.id)} className="hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-sm text-[#9B9B9F] font-mono">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">{admin.name}</td>
                <td className="px-4 py-3 text-sm text-[#9B9B9F]">{admin.email}</td>
                <td className="px-4 py-3"><RoleBadge role={admin.role} /></td>
                <td className="px-4 py-3 text-sm text-[#9B9B9F]">{new Date(admin.createAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-center">
                  <ActionMenu admin={admin} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}