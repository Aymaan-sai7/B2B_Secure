import { transaction, StatusType } from "../../interfaces/Transaction";

interface Props {
  newTransaction: transaction;
  setNewTransaction: React.Dispatch<React.SetStateAction<transaction>>;
  editingId: number | null;
  handleUpdate: () => void;
  onClose?: () => void;
}

const STATUS_CONFIG: Record<
  StatusType,
  { label: string; icon: string; activeClass: string }
> = {
  pending: {
    label: "Pending",
    icon: "",
    activeClass:
      "border-yellow-400 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-600",
  },
  completed: {
    label: "Completed",
    icon: "",
    activeClass:
      "border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:border-green-600",
  },
  failed: {
    label: "Failed",
    icon: "",
    activeClass:
      "border-red-400 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500",
  },
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
}: {
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#12033A] dark:focus:border-indigo-500 transition-colors"
      />
    </div>
  );
}

const icons = {
  building: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  dollar: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  tag: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  clock: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  box: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
};

export default function TransactionForm({
  newTransaction,
  setNewTransaction,
  editingId,
  handleUpdate,
  onClose,
}: Props) {
  const isEditing = editingId !== null;

  const isFormValid = isEditing
    ? true
    : newTransaction.senderCompany.trim() !== "" &&
    newTransaction.receiverCompany.trim() !== "" &&
    newTransaction.amountSend > 0 &&
    newTransaction.productType.trim() !== "" &&
    newTransaction.product.trim() !== "" &&
    newTransaction.companyWorkingHours.trim() !== "";

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            {isEditing ? "Edit entry" : "New entry"}
          </p>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isEditing ? "Update transaction" : "Add transaction"}
          </h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {!isEditing && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Sender company">
                <TextInput placeholder="Sender C..." value={newTransaction.senderCompany} onChange={(e) => setNewTransaction({ ...newTransaction, senderCompany: e.target.value })} icon={icons.building} />
              </Field>
              <Field label="Receiver company">
                <TextInput placeholder="Receiver C..." value={newTransaction.receiverCompany} onChange={(e) => setNewTransaction({ ...newTransaction, receiverCompany: e.target.value })} icon={icons.building} />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Amount sent">
                <TextInput type="number" placeholder="Amount..." value={newTransaction.amountSend} onChange={(e) => setNewTransaction({ ...newTransaction, amountSend: Number(e.target.value) })} icon={icons.dollar} />
              </Field>
              <Field label="Working hours">
                <TextInput placeholder="9am – 5pm" value={newTransaction.companyWorkingHours} onChange={(e) => setNewTransaction({ ...newTransaction, companyWorkingHours: e.target.value })} icon={icons.clock} />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Product type">
                <TextInput placeholder="Product Ty..." value={newTransaction.productType} onChange={(e) => setNewTransaction({ ...newTransaction, productType: e.target.value })} icon={icons.tag} />
              </Field>
              <Field label="Product">
                <TextInput placeholder="Product..." value={newTransaction.product} onChange={(e) => setNewTransaction({ ...newTransaction, product: e.target.value })} icon={icons.box} />
              </Field>
            </div>
          </>
        )}

        {/* Status - بيظهر دايمًا */}
        <Field label="Status">
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(STATUS_CONFIG) as StatusType[]).map((status) => {
              const config = STATUS_CONFIG[status];
              const isActive = newTransaction.status === status;
              return (
                <button key={status} type="button" onClick={() => setNewTransaction({ ...newTransaction, status })}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium border transition-all duration-150 ${isActive ? config.activeClass : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                  {config.label}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      <div className="flex gap-2 mt-6">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleUpdate}
          disabled={!isFormValid}
          className="flex-[2] py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-[#12033A] hover:bg-[#1e0a5e] transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!isEditing && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
          {isEditing ? "Update transaction" : "Add transaction"}
        </button>
      </div>

      {!isFormValid && (
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">
          Fill in all fields to continue
        </p>
      )}
    </div>
  );
}