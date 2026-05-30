import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { transaction } from "../../interfaces/Transaction";
import { getTransactionById } from "../../services/TransactionService";


function StatusBadge({ status }: { status: transaction["status"] }) {
  const styles = {
    completed: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    pending: "bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    failed: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  };
  const icons = { completed: "", pending: "", failed: "" };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <span>{icons[status]}</span>
      {status}
    </span>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-800 dark:text-white">{value}</span>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-6 pt-5 pb-1">
      {label}
    </p>
  );
}


export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const transactionId = id as string;
  const [transaction, setTransaction] = useState<transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const result = await getTransactionById(transactionId);
        setTransaction(result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!transaction) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <span className="text-4xl"></span>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Transaction not found</p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-[#12033A] dark:text-indigo-400 underline underline-offset-2"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        Back to transactions
      </button>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] overflow-hidden">

        {/* header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#12033A] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                Transaction #{transaction.id}
              </p>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {transaction.senderCompany} : {transaction.receiverCompany}
              </h2>
            </div>
          </div>
          <StatusBadge status={transaction.status} />
        </div>

        {/* amount */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Amount sent</span>
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            ${transaction.amountSend.toLocaleString()}
          </span>
        </div>


        <SectionLabel label="Transfer" />
        <div className="px-6 pb-2">
          <Row label="Transaction ID" value={`${transaction.id}`} />
          <Row label="Date" value={transaction.date} />
          <Row label="Status" value={<StatusBadge status={transaction.status} />} />
        </div>

        {/* Parties */}
        <SectionLabel label="Parties" />
        <div className="px-6 pb-2">
          <Row label="Sender company" value={transaction.senderCompany} />
          <Row label="Receiver company" value={transaction.receiverCompany} />
          <Row label="Working hours" value={transaction.companyWorkingHours} />
        </div>

        {/* Product */}
        <SectionLabel label="Product" />
        <div className="px-6 pb-4">
          <Row label="Product type" value={transaction.productType} />
          <Row label="Product" value={transaction.product} />
        </div>

      </div>
    </div>
  );
}