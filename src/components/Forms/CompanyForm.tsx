type StatusType = "Completed" | "Pending" | "Failed";

type CompanyFormData = {
  name: string;
  email: string;
  status: StatusType;
};

interface Props {
  newCompany: CompanyFormData;
  setNewCompany: React.Dispatch<React.SetStateAction<CompanyFormData>>;
  editingId: number | null;
  handleAdd: () => void;
  handleUpdate: () => void;
  onClose?: () => void;
}

const STATUS_CONFIG: Record<
  StatusType,
  { label: string; icon: string; activeClass: string }
> = {
  Pending: {
    label: "Pending",
    icon: "",
    activeClass:
      "border-yellow-400 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-600",
  },
  Completed: {
    label: "Completed",
    icon: "",
    activeClass:
      "border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:border-green-600",
  },
  Failed: {
    label: "Failed",
    icon: "",
    activeClass:
      "border-red-400 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500",
  },
};

export default function CompanyForm({
  newCompany,
  setNewCompany,
  editingId,
  handleAdd,
  handleUpdate,
  onClose,
}: Props) {
  const isFormValid =
    newCompany.name.trim() !== "" && newCompany.email.trim() !== "";
  const isEditing = editingId !== null;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            {isEditing ? "Edit entry" : "New entry"}
          </p>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isEditing ? "Update company" : "Add company"}
          </h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
            aria-label="Close form"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="company-name"
            className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5"
          >
            Company name
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </span>
            <input
              id="company-name"
              type="text"
              placeholder="e.g. Acme Corp"
              value={newCompany.name}
              onChange={(e) =>
                setNewCompany({ ...newCompany, name: e.target.value })
              }
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#12033A] dark:focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="company-email"
            className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5"
          >
            Email address
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              id="company-email"
              type="email"
              placeholder="contact@company.com"
              value={newCompany.email}
              onChange={(e) =>
                setNewCompany({ ...newCompany, email: e.target.value })
              }
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#12033A] dark:focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5">
            Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(STATUS_CONFIG) as StatusType[]).map((status) => {
              const config = STATUS_CONFIG[status];
              const isActive = newCompany.status === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setNewCompany({ ...newCompany, status })}
                  className={`
                    flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium
                    border transition-all duration-150
                    ${isActive
                      ? config.activeClass
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <span className="text-xs">{config.icon}</span>
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
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
          onClick={isEditing ? handleUpdate : handleAdd}
          disabled={!isFormValid}
          className={`
            flex-[2] py-2.5 px-4 rounded-lg text-sm font-medium text-white
            bg-[#12033A] hover:bg-[#1e0a5e] transition-colors
            flex items-center justify-center gap-2
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
        >
          {!isEditing && (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
          {isEditing ? "Update company" : "Add company"}
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
