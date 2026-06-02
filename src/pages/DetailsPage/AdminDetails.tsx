import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { AdminApiResponse } from "../../interfaces/Admin";
import { getAdminById, changeAdminPassword, changeAdminRole } from "../../services/AdminServices";


function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

//sub components
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#E7E6EB] dark:border-[#5C5C5C] last:border-0">
      <span className="text-sm text-[#9B9B9F]">{label}</span>
      <span className="text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">{value}</span>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DBDDFF] text-[#12033A] dark:bg-[#0F1C2E] dark:text-[#4DA3FF]">
      {role}
    </span>
  );
}


export default function AdminDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState<AdminApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [savingRole, setSavingRole] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const result = await getAdminById(Number(id));
        setAdmin(result);
      } catch (err) {
        console.log(err);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAdmin();
  }, [id]);

  const handleChangePassword = async () => {
    if (!newPassword) return;
    try {
      setSavingPassword(true);
      await changeAdminPassword(id!, newPassword);
      enqueueSnackbar("Password updated", { variant: "success" });
      setIsPasswordOpen(false);
      setNewPassword("");
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Failed to update password", { variant: "error" });
    } finally {
      setSavingPassword(false);
    }
  };

  const handleChangeRole = async () => {
    if (!newRole) return;
    try {
      setSavingRole(true);
      await changeAdminRole(id!, newRole);
      enqueueSnackbar("Role updated", { variant: "success" });
      setAdmin((prev) => prev ? { ...prev, roles: [newRole] } : prev);
      setIsRoleOpen(false);
      setNewRole("");
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Failed to update role", { variant: "error" });
    } finally {
      setSavingRole(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] dark:bg-[#101010]">
        <div className="w-8 h-8 border-2 border-[#12033A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <span className="text-4xl"></span>
        <p className="text-sm text-[#9B9B9F]">Admin not found</p>
        <button onClick={() => navigate(-1)} className="text-xs text-[#0047FF] hover:underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-[#9B9B9F] hover:text-[#12033A] dark:hover:text-[#F3F4F6] mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        Back to admins
      </button>

      <div className="bg-[#FFFFFF] dark:bg-white/[0.03] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E7E6EB] dark:border-[#5C5C5C] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#12033A] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {admin.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#9B9B9F] mb-0.5">
              Admin {admin.id}
            </p>
            <h2 className="text-lg font-semibold text-[#12033A] dark:text-[#F3F4F6]">
              {admin.name}
            </h2>
          </div>
        </div>

        {/* details */}
        <div className="px-6 py-2">
          <Row label="Admin ID" value={`${admin.id}`} />
          <Row label="Email" value={admin.email} />
          <Row label="Member since" value={formatDate(admin.created_at)} />
          <Row
            label="Role"
            value={
              <div className="flex gap-2 flex-wrap justify-end">
                {admin.roles?.map((role, i) => (
                  <RoleBadge key={i} role={role} />
                ))}
              </div>
            }
          />
        </div>

        {/* buttons */}
        <div className="px-6 py-4 border-t border-[#E7E6EB] dark:border-[#5C5C5C] flex flex-wrap gap-2">
          <button
            onClick={() => setIsPasswordOpen(true)}
            className="flex-1 h-10 text-sm rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] text-[#12033A] dark:text-[#EDEDED] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
          >
            Change Password
          </button>
          <button
            onClick={() => { setNewRole(admin.roles?.[0] || ""); setIsRoleOpen(true); }}
            className="flex-1 h-10 text-sm rounded-xl bg-[#12033A] text-white hover:bg-[#1e0a5e] transition-colors"
          >
            Change Role
          </button>
        </div>

      </div>

      {isPasswordOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setIsPasswordOpen(false)}
        >
          <div
            className="bg-[#FFFFFF] dark:bg-[#1E1E1E] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-[#12033A] dark:text-[#F3F4F6]">Change Password</h2>
              <button title="password" onClick={() => setIsPasswordOpen(false)} className="text-[#9B9B9F] hover:text-[#12033A] dark:hover:text-[#F3F4F6] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <label className="block text-sm text-[#9B9B9F] mb-1.5">New password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-11 px-3 text-sm rounded-lg border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#F1F3FA] dark:bg-[#101010] text-[#12033A] dark:text-[#EDEDED] focus:outline-none focus:border-[#12033A] transition-colors mb-5"
            />

            <div className="flex gap-2">
              <button onClick={() => setIsPasswordOpen(false)}
                className="flex-1 h-11 text-sm rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] text-[#9B9B9F] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button onClick={handleChangePassword} disabled={savingPassword || !newPassword}
                className="flex-[2] h-11 text-sm rounded-xl bg-[#12033A] text-white hover:bg-[#1e0a5e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {savingPassword ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isRoleOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setIsRoleOpen(false)}
        >
          <div
            className="bg-[#FFFFFF] dark:bg-[#1E1E1E] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-[#12033A] dark:text-[#F3F4F6]">Change Role</h2>
              <button title="role" onClick={() => setIsRoleOpen(false)} className="text-[#9B9B9F] hover:text-[#12033A] dark:hover:text-[#F3F4F6] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <label className="block text-sm text-[#9B9B9F] mb-1.5">Select role</label>

            <div className="grid grid-cols-3 gap-2 mb-5">
              {["Admin",].map((role) => (
                <button
                  key={role}
                  onClick={() => setNewRole(role)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${newRole === role
                      ? "bg-[#DBDDFF] text-[#12033A] border-[#0047FF]"
                      : "border-[#E7E6EB] dark:border-[#5C5C5C] text-[#9B9B9F] hover:bg-[#F1F3FA] dark:hover:bg-white/5"
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setIsRoleOpen(false)}
                className="flex-1 h-11 text-sm rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] text-[#9B9B9F] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button onClick={handleChangeRole} disabled={savingRole || !newRole}
                className="flex-[2] h-11 text-sm rounded-xl bg-[#12033A] text-white hover:bg-[#1e0a5e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {savingRole ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}