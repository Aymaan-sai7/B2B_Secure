import { useTranslation } from "react-i18next";
import { AdminRole } from "../Data/dataAdmins";

type AdminFormData = {
  name: string;
  email: string;
  role: AdminRole;
};

interface Props {
  newAdmin: AdminFormData;
  setNewAdmin: React.Dispatch<React.SetStateAction<AdminFormData>>;
  editingId: number | null;
  handleAdd: () => void;
  handleUpdate: () => void;
  onClose?: () => void;
}

const Role: Record<
  AdminRole,
  { label: string; icon: string; activeClass: string }
> = {
  Admin: {
    label: "Admin",
    icon: "",
    activeClass:
      "border-purple-500 bg-purple-50 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-600",
  },
  Moderator: {
    label: "Moderator",
    icon: "",
    activeClass:
      "border-blue-400 bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500",
  }
};

export default function AdminForm({
  newAdmin,
  setNewAdmin,
  editingId,
  handleAdd,
  handleUpdate,
  onClose,
}: Props) {
  const { t } = useTranslation();
  const isEditing = editingId !== null;
  const isFormValid =
    newAdmin.name.trim() !== "" && newAdmin.email.trim() !== "";

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            {isEditing ? "Edit entry" : "New entry"}
          </p>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isEditing ? t("updateAdmin") : t("addAdmin")}
          </h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
            aria-label="Close form"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5">
            Admin name
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#12033A] dark:focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="admin@company.com"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#12033A] dark:focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5">
            Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(Role) as AdminRole[]).map((role) => {
              const config = Role[role];
              const isActive = newAdmin.role === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setNewAdmin({ ...newAdmin, role })}
                  className={`
                    flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium
                    border transition-all duration-150
                    ${
                      isActive
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
          className="flex-[2] py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-[#12033A] hover:bg-[#1e0a5e] transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!isEditing && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
          {isEditing ? t("update") : t("add")}
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