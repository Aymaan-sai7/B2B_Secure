import { useTranslation } from "react-i18next";

import { AdminRole } from "../Data/dataAdmins"



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
}

export default function AdminForm({
    newAdmin,
    setNewAdmin,
    editingId,
    handleAdd,
    handleUpdate,
}: Props) {
    const { t } = useTranslation();
    return (
        <>
            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 text-center">
                {editingId ? t("updateAdmin") : t("addAdmin")}
            </h2>

            {/* Fields */}
            <div className="grid grid-cols-2 gap-4">

                {/* Name */}
                <input
                    type="text"
                    placeholder="Admin Name"
                    className="w-full p-2 border rounded"
                    value={newAdmin.name}
                    onChange={(e) =>
                        setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={newAdmin.email}
                    onChange={(e) =>
                        setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                />

                {/* Role */}
                <select
                    aria-label="Select Admin Role"
                    className="w-full p-2 border rounded col-span-2"
                    value={newAdmin.role}
                    onChange={(e) =>
                        setNewAdmin({
                            ...newAdmin,
                            role: e.target.value as AdminRole,
                        })
                    }
                >
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="User">User</option>
                </select>
            </div>

            {/* Button */}
            <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                {editingId ? t("update") : t("add")}
            </button>
        </>
    );
}