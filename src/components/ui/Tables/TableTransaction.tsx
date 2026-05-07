
import { transaction } from "../../Data/dataTransactions";
import Badge from "../Badge";
import { Edit2, Trash2 } from "lucide-react";

interface Props {
    data: transaction[];
    onEdit: (t: transaction) => void;
    onDelete: (id: number) => void;
    onRowClick: (id: number) => void;
}




export default function TransactionTable({
    data,
    onEdit,
    onDelete,
    onRowClick,
}: Props) {
    return (
        <div className="max-w-full overflow-x-auto">
            <table className="w-full">

                {/* Header */}
                <thead className="border-y border-gray-100 dark:border-gray-800">
                    <tr className="text-left">

                        <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                            ID
                        </th>

                        <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                            Sender Company
                        </th>

                        <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                            Receiver Company
                        </th>

                        <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                            Transaction Date
                        </th>

                        <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                            Status
                        </th>

                        <th className="px-5 py-4 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                            Action
                        </th>

                    </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

                    {data.map((transaction) => (
                        <tr key={transaction.id}
                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"
                            onClick={() => onRowClick(transaction.id)}
                        >

                            <td className="px-5 py-4 text-theme-sm font-medium text-gray-800 dark:text-white">
                                {transaction.id}
                            </td>

                            <td className="px-5 py-4 text-theme-sm font-medium text-gray-800 dark:text-white">
                                {transaction.senderCompany}
                            </td>

                            <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                                {transaction.receiverCompany}
                            </td>

                            <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                                {transaction.date}
                            </td>

                            <td className="px-5 py-4">
                                <Badge
                                    size="sm"
                                    color={
                                        transaction.status === "Completed"
                                            ? "success"
                                            : transaction.status === "Pending"
                                                ? "warning"
                                                : "error"
                                    }
                                >
                                    {transaction.status}
                                </Badge>
                            </td>

                            <td className="px-5 py-4 flex gap-3">
                                {/* أيقونة التعديل */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        onEdit(transaction)
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
                                        e.stopPropagation(); 
                                        onDelete(transaction.id)
                                    }
                                    }
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    )
}