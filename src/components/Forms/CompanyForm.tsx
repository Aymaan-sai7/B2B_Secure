import { CompanyPayload } from "../../interfaces/Company";


interface Props {
  newCompany: CompanyPayload;
  setNewCompany: React.Dispatch<React.SetStateAction<CompanyPayload>>;
  editingId: number | null;
  handleAdd: () => void;
  handleUpdate: () => void;
  onClose?: () => void;
}

function Field({
  label, id, type = "text", placeholder, value, onChange, icon,
}: {
  label: string; id: string; type?: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#9B9B9F] mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9B9F]">{icon}</span>
        <input
          id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
          autoComplete={type === "password" ? "new-password" : undefined}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#FFFFFF] dark:bg-white/[0.03] text-[#12033A] dark:text-[#EDEDED] placeholder:text-[#9B9B9F] focus:outline-none focus:border-[#12033A] dark:focus:border-[#F3F4F6] transition-colors"
        />
      </div>
    </div>
  );
}

export default function CompanyForm({ newCompany, setNewCompany, editingId, handleAdd, handleUpdate, onClose }: Props) {
  const isEditing = editingId !== null;
  const isFormValid = isEditing
  ? newCompany.name.trim() !== ""
  : newCompany.name.trim() !== "" && newCompany.email.trim() !== "" && newCompany.password.trim() !== "";

  return (
    <div className="w-full max-w-md mx-auto">

      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#9B9B9F] mb-1">
            {isEditing ? "Edit entry" : "New entry"}
          </p>
          <h2 className="text-lg font-semibold text-[#12033A] dark:text-[#F3F4F6]">
            {isEditing ? "Update company" : "Add company"}
          </h2>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#9B9B9F] hover:text-[#12033A] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-4">
  <Field label="Company name" id="company-name" placeholder="company 1" value={newCompany.name}
    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
  />

  {!isEditing && (
    <>
      <Field label="Email address" id="company-email" type="email" placeholder="company@gmail.com" value={newCompany.email}
        onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
      />
      <Field label="Password" id="company-password" type="password" placeholder="pass..." value={newCompany.password}
        onChange={(e) => setNewCompany({ ...newCompany, password: e.target.value })}
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c1.66 0 3-1.34 3-3V6a3 3 0 10-6 0v2c0 1.66 1.34 3 3 3zm6 2H6a2 2 0 00-2 2v5h16v-5a2 2 0 00-2-2z" /></svg>}
      />
      <Field label="Industry" id="company-industry" placeholder="logic..." value={newCompany.industry}
        onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" /></svg>}
      />
      <Field label="Address" id="company-address" placeholder="Cairo" value={newCompany.address}
        onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
      />
    </>
  )}
</div>

      <div className="flex gap-2 mt-6">
        {onClose && (
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border border-[#E7E6EB] dark:border-[#5C5C5C] text-[#9B9B9F] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors">
            Cancel
          </button>
        )}
        <button type="button" onClick={isEditing ? handleUpdate : handleAdd} disabled={!isFormValid}
          className="flex-[2] py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-[#12033A] hover:bg-[#1e0a5e] transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
          {!isEditing && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
          {isEditing ? "Update company" : "Add company"}
        </button>
      </div>

      {!isFormValid && (
        <p className="text-xs text-[#9B9B9F] text-center mt-3">Fill in all fields to continue</p>
      )}
    </div>
  );
}