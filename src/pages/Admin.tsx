import PageMeta from "../components/common/PageMeta";
import { useState, useEffect } from "react";



import { useTranslation } from "react-i18next";

import { AdminRole } from "../components/Data/dataAdmins"
import { AdminType, tableData } from "../components/Data/dataAdmins"

import AdminForm from "../components/Forms/AdminForm";

import Modal from "../components/ui/Modal";
import AdminToolbar from "../components/ui/TableBar/AdminToolbar";
import AdminTable from "../components/ui/Tables/TableAdmin";

import TableSkeleton from "../components/ui/TableSkeleton";
import { motion } from "framer-motion";


export default function Admin() {

    const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setData(tableData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const [data, setData] = useState(tableData);
  const [filteredData, setFilteredData] = useState(tableData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<"all" | "name" | "date">("all");

  const [editingId, setEditingId] = useState<number | null>(null);



  const [newAdmin, setNewAdmin] = useState<{
    name: string;
    email: string;
    role: AdminRole;
  }>({
    name: "",
    email: "",
    role: "Admin",
  });

  const handleSort = (type: "all" | "name" | "date") => {
    setActiveSort(type);

    let sorted = [...data];

    if (type === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (type === "date") {
      sorted.sort((a, b) => a.createAt.localeCompare(b.createAt));
    }

    if (type === "all") {
      sorted = [...data];
    }

    setFilteredData(sorted); // 👈 بدل setData
    setIsFilterOpen(false);
  };
  const handleAdd = () => {
    if (!newAdmin.name || !newAdmin.email) {
      alert("Please fill all required fields");
      return;
    }
    const lastId = data.length ? data[data.length - 1].id : 0;

    const newItem = {
      id: lastId + 1,
      createAt: new Date().toLocaleDateString(),
      action: "icons",
      ...newAdmin,
    };
    const updatedData = [...data, newItem];
    setData(updatedData);
    setFilteredData(updatedData)
    setIsOpen(false);
  };

  const startEdit = (admin: AdminType) => {
    setEditingId(admin.id);
    setNewAdmin({
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
    setIsOpen(true);
  };
  const handleUpdate = () => {
    if (editingId === null) return;

    const updated = data.map((a) =>
      a.id === editingId
        ? { ...a, ...newAdmin }
        : a
    );

    setData(updated);
    setFilteredData(updated)
    setEditingId(null);
    setIsOpen(false);
  };

  const resetForm = () => {
    setNewAdmin({
      name: "",
      email: "",
      role: "Admin",
    });
  };

  const handleDelete = (id: number) => {
    const updated = data.filter((a) => a.id !== id);
    setData(updated);
    setFilteredData(updated)
  };

  const { t } = useTranslation();



  return (
    <>
      <PageMeta
        title="Admin"
        description="Admin"
      />
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
>
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {t("admins")}
            </h3>
          </div>
          <AdminToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isFilterOpen={isFilterOpen}
            onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
            closeFilterDropdown={() => setIsFilterOpen(false)}
            activeSort={activeSort}
            onSort={handleSort}
            onAddClick={() => {
              setEditingId(null);
              resetForm();
              setIsOpen(true);
            }}
          />
        </div>
        {loading ? (
          <TableSkeleton />
        ) : (
        <AdminTable
          data={filteredData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          onEdit={startEdit}
          onDelete={handleDelete}
        />
        )}
      </motion.div>


      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AdminForm
          newAdmin={newAdmin}
          setNewAdmin={setNewAdmin}
          editingId={editingId}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
        />

        {/* زرار close */}
        <button
          onClick={() => {
            setIsOpen(false);
            setEditingId(null);
            resetForm();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
        >
          ×
        </button>
      </Modal>
    </>
  );
}
