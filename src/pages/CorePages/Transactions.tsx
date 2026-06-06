import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";

import PageMeta from "../../components/common/PageMeta";
import Modal from "../../components/ui/Modal";
import TableSkeleton from "../../components/ui/TableSkeleton";
import Confirm from "../../components/ui/Confirm";
import TransactionForm from "../../components/Forms/TransactionForm";
import TransactionTable from "../../components/ui/Tables/TableTransaction";
import TransactionToolbar from "../../components/ui/TableBar/TransactionToolbar";
import TransactionReport from "../../components/Report/Report/TransactionReport";

import { transaction, StatusType } from "../../interfaces/Transaction";
import { getAllTransactions, updateTransaction, deleteTransaction } from "../../services/TransactionService";


export default function Transaction() {
  const navigate = useNavigate();
const [currentPage, setCurrentPage] = useState(1);
const ITEMS_PER_PAGE = 10;

  const [data, setData] = useState<transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState<"all" | "state" | "sender" | "receiver">("all");
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<() => void>(() => { });

  const emptyTransaction: transaction = {
    id: "",
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
    status: "pending",
  };

  const [newTransaction, setNewTransaction] = useState<transaction>(emptyTransaction);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const result = await getAllTransactions();
      setData(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { setCurrentPage(1); }, [searchTerm, activeSort]);

  useEffect(() => { fetchTransactions(); }, []);

  const openConfirm = ({ title, message, action }: { title: string; message: string; action: () => void }) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setIsConfirmOpen(true);
  };

  const resetForm = () => setNewTransaction(emptyTransaction);

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    resetForm();
  };

  const startEdit = (t: transaction) => {
    setEditingId(t.id);
    setNewTransaction({ ...t });
    setIsOpen(true);
  };

  const handleUpdate = async () => {
    if (editingId === null) return;
    try {
      await updateTransaction(editingId, { status: newTransaction.status });
      setData((prev) =>
        prev.map((t) => t.id === editingId ? { ...t, status: newTransaction.status } : t)
      );
      enqueueSnackbar("Transaction Updated", { variant: "success" });
      setEditingId(null);
      setIsOpen(false);
      resetForm();
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Update Failed", { variant: "error" });
      fetchTransactions();
    }
  };

  const confirmUpdate = () => {
    openConfirm({
      title: "Update Transaction",
      message: "Are you sure you want to save these changes?",
      action: () => handleUpdate(),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      setData((prev) => prev.filter((t) => t.id !== id));
      await deleteTransaction(id);
      enqueueSnackbar("Transaction Deleted", { variant: "success" });
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Delete Failed", { variant: "error" });
      fetchTransactions();
    }
  };

  const handleSort = (type: "all" | "state" | "sender" | "receiver") => setActiveSort(type);


  const finalData = [...data]
    .filter((item) =>
      item.senderCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.receiverCompany.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (activeSort === "state") {
        const order: StatusType[] = ["completed", "pending", "failed"];
        return order.indexOf(a.status) - order.indexOf(b.status);
      }
      if (activeSort === "sender") return a.senderCompany.localeCompare(b.senderCompany);
      if (activeSort === "receiver") return a.receiverCompany.localeCompare(b.receiverCompany);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const paginatedData = finalData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
const totalPages = Math.ceil(finalData.length / ITEMS_PER_PAGE);


  const toggleFilterDropdown = () => setIsFilterDropdownOpen(!isFilterDropdownOpen);
  const closeFilterDropdown = () => setIsFilterDropdownOpen(false);

  return (
    <>
      <PageMeta title="Transactions" description="Transactions" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-[#E7E6EB] bg-[#FFFFFF] px-4 pb-3 pt-4 dark:border-[#5C5C5C] dark:bg-white/[0.03] sm:px-6"
      >
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-[#12033A] dark:text-[#F3F4F6]">
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
            closeFilterDropdown={closeFilterDropdown}
          />
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <TransactionTable
            data={paginatedData}
            onEdit={startEdit}
            onDelete={(id) =>
              openConfirm({
                title: "Delete Transaction",
                message: "Are you sure you want to delete this transaction?",
                action: () => handleDelete(id),
              })
            }
            onRowClick={(id) => navigate(`/transaction/${id}`)}
          />
        )}
        {totalPages > 1 && (
  <div className="flex items-center justify-between px-2 pt-4 border-t border-[#E7E6EB] dark:border-[#5C5C5C]">
    <p className="text-xs text-[#9B9B9F]">
      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, finalData.length)} of {finalData.length}
    </p>
    <div className="flex items-center gap-1">
      <button
        title="Previous Page"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-2 py-1.5 rounded-lg text-sm border border-[#E7E6EB] dark:border-[#5C5C5C] text-[#12033A] dark:text-[#EDEDED] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
        .reduce<(number | "...")[]>((acc, page, idx, arr) => {
          if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push("...");
          acc.push(page);
          return acc;
        }, [])
        .map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className="px-2 text-[#9B9B9F] text-sm">...</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page as number)}
              className={`min-w-[32px] h-8 rounded-lg text-sm border transition-colors ${
                currentPage === page
                  ? "bg-[#12033A] text-white border-[#12033A] dark:bg-white dark:text-[#12033A] dark:border-white"
                  : "border-[#E7E6EB] dark:border-[#5C5C5C] text-[#12033A] dark:text-[#EDEDED] hover:bg-[#F1F3FA] dark:hover:bg-white/5"
              }`}
            >
              {page}
            </button>
          )
        )}

      <button
        title="Next Page"
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-2 py-1.5 rounded-lg text-sm border border-[#E7E6EB] dark:border-[#5C5C5C] text-[#12033A] dark:text-[#EDEDED] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
)}
      </motion.div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <TransactionForm
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
          editingId={editingId}
          handleUpdate={confirmUpdate}
          onClose={closeModal}
        />
      </Modal>

      <AnimatePresence>
        <TransactionReport isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      </AnimatePresence>

      <Confirm
        isOpen={isConfirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => { confirmAction(); setIsConfirmOpen(false); }}
      />
    </>
  );
}