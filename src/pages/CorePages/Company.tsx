import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { enqueueSnackbar } from "notistack";

import PageMeta from "../../components/common/PageMeta";
import Modal from "../../components/ui/Modal";
import TableSkeleton from "../../components/ui/TableSkeleton";
import Confirm from "../../components/ui/Confirm";
import CompanyForm from "../../components/Forms/CompanyForm";
import CompanyTable from "../../components/ui/Tables/TableCompany";
import CompanyToolbar from "../../components/ui/TableBar/CompanyToolbar";
import CompanyReport from "../../components/Report/Report/CompanyReport";

import { CompanyType, CompanyApiResponse } from "../../interfaces/Company";
import {
  getCompaniesAPI,
  getPendingCompaniesAPI,
  createCompanyAPI,
  updateCompanyAPI,
  deleteCompanyAPI,
  approveCompanyAPI,
} from "../../services/CompanyServices";

interface Props {
  variant?: "full" | "mini";
  limit?: number;
}

function formatCompany(c: CompanyApiResponse): CompanyType {
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    status: c.is_approved ? "Completed" : "Pending",
    date: new Date(c.created_at).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    action: "icons",
    password: "",
    industry: c.industry || "",
    address: c.address || "",
  };
}


export default function Company({ variant = "full", limit }: Props) {
  const navigate = useNavigate();

  const [data, setData] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"all" | "pending" | "completed">("all");
  const [search, setSearch] = useState("");
  const [activeSort, setActiveSort] = useState<"all" | "state" | "Company-name" | "date">("all");
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<() => void>(() => { });

  const emptyForm = { name: "", email: "", password: "", industry: "", address: "" };
  const [newCompany, setNewCompany] = useState(emptyForm);

  const openConfirmModal = ({ title, message, action }: { title: string; message: string; action: () => void }) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setIsConfirmOpen(true);
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const companies = view === "pending"
        ? await getPendingCompaniesAPI()
        : await getCompaniesAPI();

      const filtered = view === "completed"
        ? companies.filter((c) => c.is_approved)
        : companies;

      setData(filtered.map(formatCompany));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCompanies(); }, [view]);

  // no-scroll -> open report
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isReportOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = originalStyle; };
  }, [isReportOpen]);

  const openModal = () => {
    setEditingId(null);
    setNewCompany(emptyForm);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setNewCompany(emptyForm);
  };

  const startEdit = (company: CompanyType) => {
    setEditingId(company.id);
    setNewCompany({
      name: company.name,
      email: company.email,
      password: company.password,
      industry: company.industry,
      address: company.address,
    });
    setIsOpen(true);
  };

  const handleAdd = async () => {
    if (!newCompany.name || !newCompany.email || !newCompany.password || !newCompany.industry || !newCompany.address) {
      enqueueSnackbar("Please fill all fields", { variant: "warning" });
      return;
    }
    try {
      await createCompanyAPI(newCompany);
      enqueueSnackbar("Company Added Successfully", { variant: "success" });
      fetchCompanies();
      closeModal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      enqueueSnackbar(err?.response?.data?.message || "Failed to add company", { variant: "error" });
    }
  };

  const handleUpdate = async () => {
    if (editingId === null) return;
    try {
      await updateCompanyAPI(editingId, newCompany);
      setData((prev) => prev.map((c) => c.id === editingId ? { ...c, ...newCompany } : c));
      enqueueSnackbar("Company Updated", { variant: "success" });
      closeModal();
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Update Failed", { variant: "error" });
      fetchCompanies();
    }
  };

  const confirmUpdate = () => {
    openConfirmModal({
      title: "Confirm Update",
      message: "Are you sure you want to update this company?",
      action: handleUpdate,
    });
  };

  const handleApprove = async (id: number) => {
    try {
      await approveCompanyAPI(id);
      setData((prev) =>
      view === "pending"
        ? prev.filter((c) => c.id !== id)
        : prev.map((c) => c.id === id ? { ...c, status: "Completed" } : c)
);
      enqueueSnackbar("Company Approved", { variant: "success" });
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Approve Failed", { variant: "error" });
      fetchCompanies();
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setData((prev) => prev.filter((c) => c.id !== id));
      await deleteCompanyAPI(id);
      enqueueSnackbar("Company Deleted", { variant: "success" });
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Delete Failed", { variant: "error" });
      fetchCompanies();
    }
  };

  const handleSort = (type: "all" | "state" | "Company-name" | "date") => setActiveSort(type);

  const filteredData = [...data]
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (activeSort === "state") {
        const order = ["Completed", "Pending", "Failed"];
        return order.indexOf(a.status) - order.indexOf(b.status);
      }
      if (activeSort === "Company-name") return a.name.localeCompare(b.name);
      if (activeSort === "date") return a.date.localeCompare(b.date);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const FinalyData = variant === "mini" && limit ? filteredData.slice(0, limit) : filteredData;

  const toggleFilterDropdown = () => setIsFilterOpen(!isFilterOpen);
  const closeFilterDropdown = () => setIsFilterOpen(false);

  return (
    <>
      <PageMeta title="Company" description="Company" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-[#E7E6EB] bg-[#FFFFFF] px-4 pb-3 pt-4 dark:border-[#5C5C5C] dark:bg-white/[0.03] sm:px-6"
      >
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-[#12033A] dark:text-[#F3F4F6]">Companies</h3>

            {/* Tabs */}
            <div className="flex gap-2">
              {([
                { value: "all", label: "All", activeClass: "bg-[#12033A] text-white border-[#12033A]" },
                { value: "pending", label: "Pending", activeClass: "bg-[#FFFCF1] text-[#E2AE21] border-[#E2AE21]" },
                { value: "completed", label: "Completed", activeClass: "bg-[#F0FFF8] text-[#04BE7B] border-[#04BE7B]" },
              ] as const).map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setView(tab.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition ${view === tab.value
                      ? tab.activeClass
                      : "bg-[#FFFFFF] dark:bg-white/[0.03] text-[#9B9B9F] border-[#E7E6EB] dark:border-[#5C5C5C]"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {variant === "full" && (
            <CompanyToolbar
              search={search}
              setSearch={setSearch}
              onFilterClick={toggleFilterDropdown}
              isFilterOpen={isFilterOpen}
              activeSort={activeSort}
              onSort={handleSort}
              onReportClick={() => setIsReportOpen(true)}
              onAddClick={openModal}
              closeFilterDropdown={closeFilterDropdown}
            />
          )}
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <CompanyTable
            data={FinalyData}
            onEdit={startEdit}
            onDelete={(id) => openConfirmModal({
              title: "Delete Company",
              message: "Are you sure you want to delete this company?",
              action: () => handleDelete(id),
            })}
            onRowClick={(id) => navigate(`/company/${id}`)}
            onApprove={(id) => openConfirmModal({
              title: "Approve Company",
              message: "Are you sure you want to approve this company?",
              action: () => handleApprove(id),
            })}
            variant={variant}
          />
        )}
      </motion.div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <CompanyForm
          newCompany={newCompany}
          setNewCompany={setNewCompany}
          editingId={editingId}
          handleAdd={handleAdd}
          handleUpdate={confirmUpdate}
          onClose={closeModal}
        />
      </Modal>

      <AnimatePresence>
        <CompanyReport isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
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