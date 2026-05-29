import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";

import PageMeta from "../../components/common/PageMeta";
import Modal from "../../components/ui/Modal";
import TableSkeleton from "../../components/ui/TableSkeleton";
import Confirm from "../../components/ui/Confirm";
import AdminForm from "../../components/Forms/AdminForm";
import AdminTable from "../../components/ui/Tables/TableAdmin";
import AdminToolbar from "../../components/ui/TableBar/AdminToolbar";
import AdminReport from "../../components/Report/Report/AdminReport";

import { AdminType, AddAdminPayload } from "../../interfaces/Admin";
import { getAllAdmins, addAdmin, updateAdmin, deleteAdmin } from "../../services/AdminServices";


export default function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = useState<AdminType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState<"all" | "name" | "date">("all");
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<() => void>(() => { });
  const [submitting, setSubmitting] = useState(false);

  const [newAdmin, setNewAdmin] = useState<AddAdminPayload>({
  name: "", email: "", password: "", role: "Admin",
});
const resetForm = () => setNewAdmin({ name: "", email: "", password: "", role: "Admin" });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const result = await getAllAdmins();
      setData(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdmins(); }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isReportOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = originalStyle; };
  }, [isReportOpen]);

  const openConfirm = ({ title, message, action }: { title: string; message: string; action: () => void }) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setIsConfirmOpen(true);
  };

  const openModal = () => {
    setEditingId(null);
    resetForm();
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    resetForm();
  };

  const startEdit = (admin: AdminType) => {
  setEditingId(admin.id);
  setNewAdmin({ name: admin.name, email: admin.email, password: "", role: "Admin" });
  setIsOpen(true);
};

  const handleAdd = async () => {
    if (!newAdmin.name.trim() || !newAdmin.email.trim()) {
      enqueueSnackbar("Please fill all fields", { variant: "warning" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAdmin.email)) {
      enqueueSnackbar("Invalid email format", { variant: "warning" });
      return;
    }
    try {
      setSubmitting(true);
      await addAdmin({ name: newAdmin.name, email: newAdmin.email, password: newAdmin.password, role: "Admin" });
      enqueueSnackbar("Admin Added", { variant: "success" });
      fetchAdmins();
      closeModal();
    } catch (err: any) {
      console.log(err.response?.data);
      enqueueSnackbar("Failed to add admin", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (editingId === null) return;
    if (!newAdmin.name.trim() || !newAdmin.email.trim()) {
      enqueueSnackbar("Please fill all fields", { variant: "warning" });
      return;
    }
    try {
      setSubmitting(true);
      await updateAdmin(editingId, { name: newAdmin.name, email: newAdmin.email });
      setData((prev) => prev.map((a) => a.id === editingId ? { ...a, ...newAdmin } : a));
      enqueueSnackbar("Admin Updated", { variant: "success" });
      closeModal();
    } 
    catch (err: any) {
      console.log(err.response?.data);
      enqueueSnackbar(err.response?.data?.message || "Update Failed", { variant: "error" });
      fetchAdmins();
    } finally {
      setSubmitting(false);
    }
  };

  const confirmUpdate = () => {
    openConfirm({
      title: "Update Admin",
      message: "Are you sure you want to update this admin?",
      action: handleUpdate,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      setData((prev) => prev.filter((a) => a.id !== id));
      await deleteAdmin(id);
      enqueueSnackbar("Admin Deleted", { variant: "success" });
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Delete Failed", { variant: "error" });
      fetchAdmins();
    }
  };

  const handleSort = (type: "all" | "name" | "date") => setActiveSort(type);

  const finalData = [...data]
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (activeSort === "name") return a.name.localeCompare(b.name);
      if (activeSort === "date") return new Date(a.createAt).getTime() - new Date(b.createAt).getTime();
      return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
    });

  return (
    <>
      <PageMeta title="Admin" description="Admin Management" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-[#E7E6EB] bg-[#FFFFFF] px-4 pb-3 pt-4 dark:border-[#5C5C5C] dark:bg-white/[0.03] sm:px-6"
      >
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-[#12033A] dark:text-[#F3F4F6]">
            {t("admins")}
          </h3>
          <AdminToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isFilterOpen={isFilterOpen}
            onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
            closeFilterDropdown={() => setIsFilterOpen(false)}
            activeSort={activeSort}
            onSort={handleSort}
            onAddClick={openModal}
            onReportClick={() => setIsReportOpen(true)}
          />
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <AdminTable
            data={finalData}
            onEdit={startEdit}
            onDelete={(id) =>
              openConfirm({
                title: "Delete Admin",
                message: "Are you sure you want to delete this admin?",
                action: () => handleDelete(id),
              })
            }
            onRowClick={(id) => navigate(`/admin/${id}`)}
          />
        )}
      </motion.div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <AdminForm
          newAdmin={newAdmin}
          setNewAdmin={setNewAdmin}
          editingId={editingId}
          handleAdd={handleAdd}
          handleUpdate={confirmUpdate}
          onClose={closeModal}
          submitting={submitting}
        />
      </Modal>

      <AnimatePresence>
        <AdminReport isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
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