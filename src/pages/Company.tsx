import { useState } from "react";
import { useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import { useNavigate } from "react-router-dom";
import { CompanyType, companiesData } from "../components/Data/dataCompanies"

import Modal from "../components/ui/Modal";
import CompanyForm from "../components/Forms/CompanyForm";
import CompanyTable from "../components/ui/Tables/TableCompany";
import CompanyToolbar from "../components/ui/TableBar/CompanyToolbar";

import TableSkeleton from "../components/ui/TableSkeleton";


import { motion, AnimatePresence } from "framer-motion";
import { overlay, modal } from "../components/animations/animation";

interface Props {
  variant?: "full" | "mini";
  limit?: number;
}

type StatusType = "Completed" | "Pending" | "Failed";


// Define the table data using the interface


export default function Company({ variant = "full", limit }: Props) {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setData(companiesData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);



  const [data, setData] = useState(companiesData);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<"all" | "state" | "Company-name" | "date">("all");

  const [newCompany, setNewCompany] = useState<{
    name: string;
    email: string;
    status: StatusType;
  }>({
    name: "",
    email: "",
    status: "Pending",
  });


  const filteredData = [...data]
    .filter((item) => {
      const Search = item.name.toLowerCase().includes(search.toLowerCase());
      return Search;
    })
    .sort((a, b) => {
      if (activeSort === "state") {
        const order: StatusType[] = ["Completed", "Pending", "Failed"];
        return order.indexOf(a.status) - order.indexOf(b.status);
      }

      if (activeSort === "Company-name") {
        return a.name.localeCompare(b.name);
      }

      if (activeSort === "date") {
        return a.date.localeCompare(b.date);
      }

      return 0;
    });

  // ✅ إضافة
  const handleAdd = () => {
    if (!newCompany.name || !newCompany.email) {
      alert("Please fill all fields");
      return;
    }
    const lastId = data.length > 0 ? data[data.length - 1].id : 0;
    const newItem = {
      id: lastId + 1,
      date: new Date().toLocaleDateString(),
      action: "icons",
      ...newCompany,
    };

    const updatedData = [...data, newItem];
    setData(updatedData);
    setIsOpen(false);
  };

  const handleSort = (type: "all" | "state" | "Company-name" | "date") => {
    setActiveSort(type);
  };

  const FinalyData =
    variant === "mini" && limit
      ? filteredData.slice(0, limit)
      : filteredData;

  const navigate = useNavigate();

  const [editingId, setEditingId] = useState<number | null>(null);

  const startEdit = (company: CompanyType) => {
    setEditingId(company.id);
    setNewCompany({
      name: company.name,
      email: company.email,
      status: company.status,
    });
    setIsOpen(true);
  };
  const handleUpdate = () => {
    if (editingId === null) return;

    const updatedData = data.map(c =>
      c.id === editingId ? { ...c, ...newCompany } : c
    );

    setData(updatedData);
    setEditingId(null);
    setIsOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {

    const updatedData = data.filter(c => c.id !== id);
    setData(updatedData);
  };


  const resetForm = () => {
    setNewCompany({
      name: "",
      email: "",
      status: "Pending",
    });
  };


  const [isReportOpen, setIsReportOpen] = useState(false);
  const total = data.length;

  const completed = data.filter(d => d.status === "Completed").length;
  const pending = data.filter(d => d.status === "Pending").length;
  const failed = data.filter(d => d.status === "Failed").length;

  const handleDownloadCSV = () => {
    const headers = ["ID", "Name", "Email", "Status", "Date"];

    const rows = data.map(item => [
      item.id,
      item.name,
      item.email,
      item.status,
      item.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "companies_report.csv");
    document.body.appendChild(link);

    link.click();
  };
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isReportOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isReportOpen]);


  function toggleFilterDropdown() {
    setIsFilterOpen(!isFilterOpen);
  }
  function closeFilterDropdown() {
    setIsFilterOpen(false);
  }
  const openModal = () => {
    setEditingId(null);
    resetForm();
    setIsOpen(true);
  };

  return (
    <>

      <PageMeta
        title="Company"
        description="Company"
      />
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
>
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Companies
          </h3>

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
          onDelete={handleDelete}
          onRowClick={(id) => navigate(`/company/${id}`)}
          variant={variant}
        />
        )}
      </motion.div>


      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="relative">
          <button
            onClick={() => {
              setIsOpen(false);
              setEditingId(null);
              resetForm();

            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
          >
            &times;
          </button>
          <CompanyForm
            newCompany={newCompany}
            setNewCompany={setNewCompany}
            editingId={editingId}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
          />
        </div>
      </Modal>


      <AnimatePresence>
        {isReportOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsReportOpen(false)}
          >

            {/* Modal */}
            <motion.div
              variants={modal}
              onClick={(e) => e.stopPropagation()}
              // className="relative z-10 bg-white dark:bg-gray-900 rounded-xl w-[400px] p-6 shadow-xl"
              className="relative z-10 bg-white dark:bg-gray-900 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto p-6 shadow-2xl"

            >
              {/* close */}
              <button
                onClick={() => setIsReportOpen(false)}
                className="absolute top-3 right-4 text-lg"
              >
                ×
              </button>

              <h2 className="text-xl font-bold mb-4">Report Summary</h2>

              <div className="space-y-2 text-sm">
                <p>Total: {total}</p>
                <p className="text-green-600">Completed: {completed}</p>
                <p className="text-yellow-600">Pending: {pending}</p>
                <p className="text-red-600">Failed: {failed}</p>
              </div>

              <button
                onClick={handleDownloadCSV}
                className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Download CSV
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>    </>
  );
}


