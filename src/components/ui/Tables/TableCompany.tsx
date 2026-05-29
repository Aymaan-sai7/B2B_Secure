import { useState, useRef, useEffect } from "react";
import { Edit2, Trash2, CheckCircle, MoreHorizontal } from "lucide-react";
import Badge from "../Badge";
import { CompanyType } from "../../../interfaces/Company";

interface Props {
  data: CompanyType[];
  onEdit: (c: CompanyType) => void;
  onDelete: (id: number) => void;
  onRowClick: (id: number) => void;
  onApprove: (id: number) => void;
  variant?: "full" | "mini";
}

function ActionMenu({
  company,onEdit,onDelete,onApprove,
}: {
  company: CompanyType;
  onEdit: (c: CompanyType) => void;
  onDelete: (id: number) => void;
  onApprove: (id: number) => void;
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
        <div className={`absolute right-0 z-20 w-40 bg-[#FFFFFF] dark:bg-[#1E1E1E] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-xl shadow-lg overflow-hidden ${dropdownPosition === "top" ? "top-9" : "bottom-9"}`}>

          <button
            onClick={(e) => { e.stopPropagation(); onEdit(company); setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#12033A] dark:text-[#EDEDED] hover:bg-[#E1E3FF] dark:hover:bg-[#0F1C2E] hover:text-[#0047FF] dark:hover:text-[#4DA3FF] transition-colors"
          >
            <Edit2 size={14} />
            Edit
          </button>

          {/* Approve */}
          {company.status === "Pending" && (
            <button
              onClick={(e) => { e.stopPropagation(); onApprove(company.id); setIsOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#12033A] dark:text-[#EDEDED] hover:bg-[#D8FFF1] dark:hover:bg-[#0F2A22] hover:text-[#04BE7B] transition-colors"
            >
              <CheckCircle size={14} />
              Approve
            </button>
          )}

          <div className="h-px bg-[#E7E6EB] dark:bg-[#5C5C5C]" />

          <button
            onClick={(e) => { e.stopPropagation(); onDelete(company.id); setIsOpen(false); }}
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

export default function CompanyTable({
  data,
  onEdit,
  onDelete,
  onRowClick,
  onApprove,
  variant = "full",
}: Props) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full">

        {/* Header */}
        <thead className="border-y border-[#E7E6EB] dark:border-[#5C5C5C]">
          <tr className="text-left">
            {variant === "full" ? (
              <>
                <th className="w-[60px] px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
                  ID
                </th>
                <th className="  px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
                  Company Name
                </th>
                <th className="  px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
                  Email
                </th>
                <th className="  px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
                  Date
                </th>
                <th className=" px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center w-[60px] px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider ">
                  Action
                </th>
              </>
            ) : (
              <>
                <th className="px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-medium text-[#9B9B9F] uppercase tracking-wider">
                  Status
                </th>
              </>
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody className=" divide-y divide-[#E7E6EB] dark:divide-[#5C5C5C]">
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#9B9B9F]">
                No companies found
              </td>
            </tr>
          ) : (
            data.map((company, index) => (
              <tr
                key={company.id}
                className="cursor-pointer hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
                onClick={() => onRowClick(company.id)}
              >
                {variant === "full" ? (
                  <>
                                    <td className="px-4 py-3 text-sm text-[#9B9B9F] font-mono">{index + 1}</td>

                    <td className=" px-4 py-3 text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">
                      {company.name}
                    </td>
                    <td className=" px-4 py-3 text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">
                      {company.email}
                    </td>
                    
                    <td className=" px-4 py-3 text-sm text-[#9B9B9F] whitespace-nowrap">
                      {company.date}
                    </td>
                    <td className=" px-4 py-3">
                      <Badge
                        size="sm"
                        color={
                          company.status === "Completed" ? "success"
                          : company.status === "Pending" ? "warning"
                          : "error"
                        }
                      >
                        {company.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <ActionMenu
                        company={company}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onApprove={onApprove}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">
                      {company.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#9B9B9F]">
                      {company.date}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={
                          company.status === "Completed" ? "success"
                          : company.status === "Pending" ? "warning"
                          : "error"
                        }
                      >
                        {company.status}
                      </Badge>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}