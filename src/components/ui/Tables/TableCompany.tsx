import { Edit2, Trash2 } from "lucide-react";
import Badge from "../Badge";
import toast from "react-hot-toast";
import { CompanyType } from "../../Data/dataCompanies";



interface Props {
  data: CompanyType[];
  onEdit: (c: CompanyType) => void;
  onDelete: (id: number) => void;
  onRowClick: (id: number) => void;
  variant?: "full" | "mini";
}

export default function CompanyTable({
  data,
  onEdit,
  onDelete,
  onRowClick,
  variant = "full",
}: Props) {
    return (
  <div className="max-w-full overflow-x-auto">
          <table className="w-full">

            {/* Header */}
            <thead className="border-y border-gray-100 dark:border-gray-800">
              <tr className="text-left">

                {variant === "full" ? (
                  <>
                    <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      ID
                    </th>

                    <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      Company Name
                    </th>

                    <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      Date
                    </th>

                    <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </th>

                    <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      Action
                    </th>
                  </>) : (
                  <>
                    <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      Name
                    </th>

                    <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      Date
                    </th>

                    <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                  </>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {data.map((company) => (
    <tr
      key={company.id}
      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"
      onClick={() => onRowClick(company.id)}
    >

                    {variant === "full" ? (
                      <>
                        <td className="px-5 py-4 text-theme-sm font-medium text-gray-800 dark:text-white">
                          {company.id}
                        </td>

                        <td className="px-5 py-4 text-theme-sm font-medium text-gray-800 dark:text-white">
                          {company.name}
                        </td>

                        <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                          {company.date}
                        </td>

                        <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                          {company.email}
                        </td>

                        <td className="px-5 py-4">
                          <Badge
                            size="sm"
                            color={
                              company.status === "Completed"
                                ? "success"
                                : company.status === "Pending"
                                  ? "warning"
                                  : "error"
                            }
                          >
                            {company.status}
                          </Badge>
                        </td>

                        <td className="px-5 py-4 flex gap-3">
                          {/* أيقونة التعديل */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // يمنع الرو من navigate
                              onEdit(company)
                            }
                            }
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >

                            <Edit2 size={18} />
                          </button>

                          {/* أيقونة الحذف */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // يمنع الرو من navigate
                              onDelete(company.id)
                              toast.error("success Delete");
                            }
                            }
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </>) : (
                      <>
                        <td className="px-5 py-4 text-theme-sm font-medium text-gray-800 dark:text-white">
                          {company.name}
                        </td>

                        <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                          {company.date}
                        </td>

                        <td className="px-5 py-4">
                          <Badge
                            size="sm"
                            color={
                              company.status === "Completed"
                                ? "success"
                                : company.status === "Pending"
                                  ? "warning"
                                  : "error"
                            }
                          >
                            {company.status}
                          </Badge>
                        </td>
                      </>
                    )}
                  </tr>
                ))}

            </tbody>
          </table>

        </div>
    )}