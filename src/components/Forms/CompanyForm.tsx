

type StatusType = "Completed" | "Pending" | "Failed";

type CompanyFormData = {
  name: string;
  email: string;
  status: StatusType;
};

interface Props {
  newCompany: {
    name: string;
    email: string;
    status: "Completed" | "Pending" | "Failed";
  };

  setNewCompany: React.Dispatch<React.SetStateAction<CompanyFormData>>;
  editingId: number | null;
  handleAdd: () => void;
  handleUpdate: () => void;
}




export default function CompanyForm({
  newCompany,
  setNewCompany,
  editingId,
  handleAdd,
  handleUpdate,
}: Props) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">
      {editingId ? "Update Company" : "Add Company"}
    </h2>

                {/* الحقول */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full p-2 border rounded"
                value={newCompany.name}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={newCompany.email}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, email: e.target.value })
                }
              />

              <select
                aria-label="Select Company Status"
                className="w-full p-2 border rounded"
                value={newCompany.status}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, status: e.target.value as StatusType })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            {/* زر الإضافة / التحديث */}
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {editingId ? "Update Company" : "Add Company"}
            </button>
    </>
  );
}