import { transaction } from "../../components/Data/dataTransactions";



interface Props {
    newTransaction: transaction;
    setNewTransaction: React.Dispatch<React.SetStateAction<transaction>>;
    editingId: number | null;
    handleAdd: () => void;
    handleUpdate: () => void;
}

type StatusType = "Completed" | "Pending" | "Failed";


export default function TransactionForm({
    newTransaction,
    setNewTransaction,
    editingId,
    handleAdd,
    handleUpdate,
}: Props) {
    return (
        <>
            {/* العنوان */}
            <h2 className="text-2xl font-bold mb-6 text-center">
                Add Transaction
            </h2>

            {/* الحقول */}
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Sender Company"
                    className="w-full p-2 border rounded"
                    value={newTransaction.senderCompany}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, senderCompany: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Receiver Company"
                    className="w-full p-2 border rounded"
                    value={newTransaction.receiverCompany}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, receiverCompany: e.target.value })
                    }
                />


                <input
                    type="number"
                    placeholder="Amount Send"
                    className="w-full p-2 border rounded"
                    value={newTransaction.amountSend}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, amountSend: Number(e.target.value) })
                    }
                />

                <input
                    type="text"
                    placeholder="Product Type"
                    className="w-full p-2 border rounded"
                    value={newTransaction.productType}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, productType: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Product"
                    className="w-full p-2 border rounded"
                    value={newTransaction.product}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, product: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Company Working Hours"
                    className="w-full p-2 border rounded"
                    value={newTransaction.companyWorkingHours}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, companyWorkingHours: e.target.value })
                    }
                />
                <select
                    aria-label="Select transaction status"
                    className="w-full p-2 border rounded"
                    value={newTransaction.status}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, status: e.target.value as StatusType })
                    }
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                </select>
            </div>

            {/* زر الإضافة */}
            <button
                onClick={editingId ? handleUpdate : handleAdd} // لو edit شغال، يعمل update
                className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                {editingId !== null ? "Update Transaction" : "Add Transaction"}
            </button>
        </>
    );
}