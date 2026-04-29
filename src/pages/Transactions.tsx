import TransactionForm from "../components/Forms/TransactionForm";
import Modal from "../components/ui/Modal";
import TransactionTable from "../components/ui/Tables/TableTransaction";
import TransactionToolbar from "../components/ui/TableBar/TransactionToolbar";

import { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import { useNavigate } from "react-router-dom";
import { transaction, transactions } from "../components/Data/dataTransactions";


import TableSkeleton from "../components/ui/TableSkeleton";
import { motion } from "framer-motion";



type StatusType = "Completed" | "Pending" | "Failed";


export default function Transaction() {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setFilteredData(transactions);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);


  const [data, setData] = useState(transactions);
  const [filteredData, setFilteredData] = useState(transactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<"all" | "state" | "sender" | "receiver">("all");

  const [newTransaction, setNewTransaction] = useState<transaction>({
    id: 0, // هيتم تغييره عند الإضافة
    date: new Date().toLocaleDateString(),
    senderCompany: "",
    receiverCompany: "",
    state: "",
    amountSend: 0,
    productType: "",
    product: "",
    transactionDate: new Date().toLocaleDateString(),
    companyWorkingHours: "",
    action: "icons",
    status: "Pending",
  });
  const resetForm = () => {
    setNewTransaction({
      id: 0,
      date: new Date().toLocaleDateString(),
      senderCompany: "",
      receiverCompany: "",
      state: "",
      amountSend: 0,
      productType: "",
      product: "",
      transactionDate: new Date().toLocaleDateString(),
      companyWorkingHours: "",
      action: "icons",
      status: "Pending",
    });
  };


  const handleSort = (type: "all" | "state" | "sender" | "receiver") => {
    setActiveSort(type);
    let sorted = [...data];

    if (type === "state") {
      const order: StatusType[] = ["Completed", "Pending", "Failed"];

      sorted.sort(
        (a, b) => order.indexOf(a.status) - order.indexOf(b.status)
      );
    }

    if (type === "sender") {
      sorted.sort((a, b) =>
        a.senderCompany.localeCompare(b.senderCompany)
      );
    }

    if (type === "receiver") {
      sorted.sort((a, b) =>
        a.receiverCompany.localeCompare(b.receiverCompany)
      );
    }

    if (type === "all") {
      sorted = [...data]; // يرجع الطبيعي
    }

    setFilteredData(sorted);
  };

  const openModal = () => {
    setEditingId(null);
    resetForm();
    setIsOpen(true);
  };
  // ✅ إضافة
  const handleAdd = () => {
    if (!newTransaction.senderCompany || !newTransaction.receiverCompany) {
      alert("Please fill all required fields");
      return;
    }

    const lastId = data.length > 0 ? data[data.length - 1].id : 0;

    const newItem: transaction = {
      ...newTransaction,
      id: lastId + 1,
      date: new Date().toLocaleDateString(),
      transactionDate: new Date().toLocaleDateString(),
      action: "icons",
    };

    const updatedData = [...data, newItem];

    setData(updatedData);
    setFilteredData(updatedData);
    setIsOpen(false);

    // Reset form
    setNewTransaction({
      id: 0,
      date: new Date().toLocaleDateString(),
      senderCompany: "",
      receiverCompany: "",
      state: "",
      amountSend: 0,
      productType: "",
      product: "",
      transactionDate: new Date().toLocaleDateString(),
      companyWorkingHours: "",
      action: "icons",
      status: "Pending",
    });
  };

  const navigate = useNavigate();


  const [editingId, setEditingId] = useState<number | null>(null);

  const startEdit = (transaction: transaction) => {
    setEditingId(transaction.id); // حفظ الـ id اللي هنعمل عليه تعديل
    setNewTransaction({ ...transaction }); // pre-fill الفورم
    setIsOpen(true); // فتح الفورم
  };

  const handleUpdate = () => {
    if (editingId === null) return;

    const updatedData = data.map(t =>
      t.id === editingId ? { ...t, ...newTransaction } : t
    );

    setData(updatedData);
    setFilteredData(updatedData);
    setEditingId(null);
    setIsOpen(false);
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter(t => t.id !== id);
    setData(updatedData);
    setFilteredData(updatedData);
  };


  function toggleFilterDropdown() {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  }

  function closeFilterDropdown() {
    setIsFilterDropdownOpen(false);
  }

  const [isReportOpen, setIsReportOpen] = useState(false);
  const total = data.length;

  const completed = data.filter(d => d.status === "Completed").length;
  const pending = data.filter(d => d.status === "Pending").length;
  const failed = data.filter(d => d.status === "Failed").length;

  const handleDownloadCSV = () => {
    const headers = ["ID", "Sender", "Receiver", "Amount", "Status", "Date"];

    const rows = data.map(item => [
      item.id,
      item.senderCompany,
      item.receiverCompany,
      item.amountSend,
      item.status,
      item.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Transactions_report.csv");
    document.body.appendChild(link);

    link.click();
  };

  return (
    <>
      <PageMeta
        title="Transactions"
        description="Transactions"
      />
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
>
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Transactions
          </h3>

          <TransactionToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onFilterClick={toggleFilterDropdown}
            isFilterOpen={isFilterDropdownOpen}
            activeSort={activeSort}
            onSort={handleSort}
            onReportClick={() => setIsReportOpen(true)}
            onAddClick={openModal}
            closeFilterDropdown={closeFilterDropdown}
          />
        </div>
        {loading ? (
          <TableSkeleton />
        ) : (
          <TransactionTable
            data={filteredData}
            onEdit={startEdit}
            onDelete={handleDelete}
            onRowClick={(id) => navigate(`/transaction/${id}`)}
          />
        )}
      </motion.div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="relative">

          {/* زرار الإغلاق */}
          <button
            onClick={() => {
              setIsOpen(false);
              setEditingId(null);
              resetForm();
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
          >
            &times;
          </button>

          <TransactionForm
            newTransaction={newTransaction}
            setNewTransaction={setNewTransaction}
            editingId={editingId}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
          />

        </div>
      </Modal>

      {isReportOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[400px] p-6 relative">

            {/* close */}
            <button
              onClick={() => setIsReportOpen(false)}
              className="absolute top-3 right-4 text-lg"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Report Summary</h2>

            <div className="space-y-2 text-sm">
              <p>Total: {total}</p>
              <p className="text-green-600">Completed: {completed}</p>
              <p className="text-yellow-600">Pending: {pending}</p>
              <p className="text-red-600">Failed: {failed}</p>
            </div>

            {/* download */}
            <button
              onClick={handleDownloadCSV}
              className="w-full mt-5 bg-blue-600 text-white py-2 rounded"
            >
              Download CSV
            </button>
          </div>
        </div>
      )}
    </>
  );
}
