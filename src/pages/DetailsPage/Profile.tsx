import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getInitial = (name: string) => {
  return name.charAt(0).toUpperCase();
};

export default function Profile() {
  const { admin, loading, error, refreshAdmin } = useAdmin();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  function openEdit() {
    setFormData({ name: admin!.name, email: admin!.email });
    setIsEditOpen(true);
  }
  function closeEdit() {
    setIsEditOpen(false);
  }

  const handleUpdateProfile = async () => {
    try {
      setSaving(true);
      await api.put("/admin/profile", formData);
      await refreshAdmin(); 
      closeEdit();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] dark:bg-[#101010]">
        <div className="w-8 h-8 border-2 border-[#12033A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !admin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 bg-[#FFFFFF] dark:bg-[#101010]">
        <p className="text-[#FF4951] text-sm">{error || "Something went wrong"}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs text-[#0047FF] hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Profile" description="Admin profile" />

      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] dark:bg-[#101010] px-4">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-[#9B9B9F] hover:text-[#12033A] dark:hover:text-[#F3F4F6] mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="bg-[#FFFFFF] dark:bg-white/[0.03] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl p-6">

            {/* name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-[#12033A] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {getInitial(admin.name)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#12033A] dark:text-[#F3F4F6]">
                  {admin.name}
                </h2>
                <p className="text-sm text-[#9B9B9F]">{admin.email}</p>
              </div>
            </div>

            {/* details*/}
            <div className="divide-y divide-[#E7E6EB] dark:divide-[#5C5C5C]">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-[#9B9B9F]">Admin ID</span>
                <span className="text-sm font-medium text-[#12033A] dark:text-[#EDEDED] font-mono">
                  {admin.id}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-[#9B9B9F]">Email</span>
                <span className="text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">
                  {admin.email}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-[#9B9B9F]">Role</span>
                <div className="flex gap-2">
                  {admin.roles.map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DBDDFF] text-[#12033A] dark:bg-[#0F1C2E] dark:text-[#4DA3FF]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-[#9B9B9F]">Member since</span>
                <span className="text-sm font-medium text-[#12033A] dark:text-[#EDEDED]">
                  {formatDate(admin.created_at)}
                </span>
              </div>

            </div>
          </div>

          <button
            onClick={openEdit}
            className="mt-4 w-full h-11 bg-[#12033A] text-white text-sm rounded-xl hover:bg-[#1e0a5e] transition-colors"
          >
            Edit Profile
          </button>

          <p className="text-center text-xs text-[#9B9B9F] mt-6">
            
          </p>
        </div>
      </div>

      {isEditOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={closeEdit}
        >
          <div
            className="bg-[#FFFFFF] dark:bg-[#1E1E1E] border border-[#E7E6EB] dark:border-[#5C5C5C] rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-[#12033A] dark:text-[#F3F4F6]">
                Edit Profile
              </h2>
              <button
              title="close"
                onClick={closeEdit}
                className="text-[#9B9B9F] hover:text-[#12033A] dark:hover:text-[#F3F4F6] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#9B9B9F] mb-1.5">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full h-11 px-3 text-sm rounded-lg border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#F1F3FA] dark:bg-[#101010] text-[#12033A] dark:text-[#EDEDED] focus:outline-none focus:border-[#12033A] dark:focus:border-[#F3F4F6] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#9B9B9F] mb-1.5">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your email"
                  className="w-full h-11 px-3 text-sm rounded-lg border border-[#E7E6EB] dark:border-[#5C5C5C] bg-[#F1F3FA] dark:bg-[#101010] text-[#12033A] dark:text-[#EDEDED] focus:outline-none focus:border-[#12033A] dark:focus:border-[#F3F4F6] transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={closeEdit}
                className="flex-1 h-11 text-sm rounded-xl border border-[#E7E6EB] dark:border-[#5C5C5C] text-[#9B9B9F] hover:bg-[#F1F3FA] dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={saving || !formData.name || !formData.email}
                className="flex-[2] h-11 text-sm rounded-xl bg-[#12033A] text-white hover:bg-[#1e0a5e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}