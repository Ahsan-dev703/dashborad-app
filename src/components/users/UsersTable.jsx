import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2 } from "lucide-react";
import { useUsers } from "../../context/features/UsersContext";
import Modal from "../common/Modal";
import ActionButton from "../common/ActionButton";

const UsersTable = () => {
  const { users, deleteUser, updateUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term),
    );
    setFilteredUsers(filtered);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const closeModal = () => {
    setEditingUser(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveUser = () => {
    if (!editingUser) return;
    updateUser({
      id: editingUser.id,
      name: editForm.name,
      email: editForm.email,
      role: editForm.role,
      status: editForm.status,
    });
    closeModal();
  };

  const handleDelete = (id) => {
    deleteUser(id);
    if (editingUser?.id === id) {
      closeModal();
    }
  };

  return (
    <>
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Users</h2>
          <div className="relative mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full sm:w-64 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-100">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-800 text-green-100"
                          : "bg-red-800 text-red-100"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-3">
                    <ActionButton
                      onClick={() => openEditModal(user)}
                      ariaLabel="Edit user"
                    >
                      <Edit size={18} />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleDelete(user.id)}
                      colorClass={`text-red-400 hover:text-red-300`}
                      ariaLabel="Delete user"
                    >
                      <Trash2 size={18} />
                    </ActionButton>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal
        open={Boolean(editingUser)}
        title="Edit User"
        description="Update the user details and save your changes."
        onClose={closeModal}
        footer={
          <>
            <button
              onClick={closeModal}
              className="rounded-2xl border border-gray-700 bg-transparent px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-white hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={saveUser}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Save changes
            </button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-gray-200">
            <span>Name</span>
            <input
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-blue-500"
            />
          </label>

          <label className="space-y-2 text-sm text-gray-200">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={editForm.email}
              onChange={handleEditChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-blue-500"
            />
          </label>

          <label className="space-y-2 text-sm text-gray-200">
            <span>Role</span>
            <input
              name="role"
              value={editForm.role}
              onChange={handleEditChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-blue-500"
            />
          </label>

          <label className="space-y-2 text-sm text-gray-200">
            <span>Status</span>
            <select
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>
      </Modal>
    </>
  );
};
export default UsersTable;
