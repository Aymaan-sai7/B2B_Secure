import { useTranslation } from "react-i18next";
import { AddAdminPayload } from "../../interfaces/Admin";
import { useState } from "react";

interface Props {
  newAdmin: AddAdminPayload;
  setNewAdmin: React.Dispatch<React.SetStateAction<AddAdminPayload>>;
  editingId: number | null;
  handleAdd: () => void;
  handleUpdate: () => void;
  onClose?: () => void;
  submitting: boolean;
}

export default function AdminForm({
  newAdmin,
  setNewAdmin,
  editingId,
  handleAdd,
  handleUpdate,
  onClose,
  submitting,
}: Props) {
  const { t } = useTranslation();
  const isEditing = editingId !== null;
  const isFormValid =
    newAdmin.name.trim() !== "" && newAdmin.email.trim() !== "" && newAdmin.password.trim() !== "";

    const [showPassword, setShowPassword] = useState(false);
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
              placeholder="admin..."
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
              placeholder="admin@gmail.com"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#12033A] dark:focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5">
            Password
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1V9a5 5 0 00-10 0v2H6a2 2 0 00-2 2v6a2 2 0 002 2zm3-10V9a3 3 0 016 0v2H9z" />
              </svg>
            </span>
            <div className="relative">
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
    {/* lock icon موجود بالفعل */}
  </span>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter password"
    value={newAdmin.password}
    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#12033A] transition-colors"
  />
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
  >
    {showPassword ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )}
  </button>
</div>
          </div>
        </div>
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
          onClick={isEditing ? handleUpdate : handleAdd}
          disabled={!isFormValid || submitting}
          className="flex-[2] py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-[#12033A] hover:bg-[#1e0a5e] transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!isEditing && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
          {submitting ? "Saving..." : isEditing ? t("update") : t("add")}
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