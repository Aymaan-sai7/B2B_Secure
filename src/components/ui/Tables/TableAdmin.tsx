

import { useTranslation } from "react-i18next";

import { Edit2, Trash2 } from "lucide-react";
import { AdminType } from "../../Data/dataAdmins";

interface Props {
  data: AdminType[];

  onEdit: (admin: AdminType) => void;
  onDelete: (id: number) => void;
}

export default function AdminTable({
  data,
  onEdit,
  onDelete,
}: Props) {

  const { t } = useTranslation();


  return (
            <div className="max-w-full overflow-x-auto">
          <table className="w-full">

            {/* Header */}
            <thead className="border-y border-gray-100 dark:border-gray-800">
              <tr className="text-left">

                <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("id")}
                </th>

                <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("name")}
                </th>

                <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("email")}
                </th>

                <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("role")}
                </th>

                <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t('createAt')}
                </th>

                <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("action")}
                </th>

              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

              {data.map((admin) => (
                  <tr key={admin.id}>

                    <td className="px-5 py-4 text-theme-sm font-medium text-gray-800 dark:text-white">
                      {admin.id}
                    </td>

                    <td className="px-5 py-4 text-theme-sm font-medium text-gray-800 dark:text-white">
                      {admin.name}
                    </td>

                    <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                      {admin.email}
                    </td>

                    <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                      {admin.role}
                    </td>

                    <td className="px-5 py-4">
                      {admin.createAt}
                    </td>

                    <td className="px-5 py-4 flex gap-3">

                      <button
                        aria-label="button admin edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(admin)
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={18} />
                      </button>

                      <button
                        aria-label="button admin delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(admin.id)
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>

                  </tr>
                ))}

            </tbody>
          </table>
        </div>
  )}