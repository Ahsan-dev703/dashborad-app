import { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext(null);

const INITIAL_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Customer",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Moderator",
    status: "Active",
  },
];

const calculateStats = (users) => {
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const newUsersToday = Math.max(0, Math.floor(totalUsers * 0.02));
  const churnRate = `${((1 - activeUsers / totalUsers) * 100).toFixed(1)}%`;

  return { totalUsers, newUsersToday, activeUsers, churnRate };
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(() => calculateStats(INITIAL_USERS));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setUsers(INITIAL_USERS);
    setStats(calculateStats(INITIAL_USERS));
    setIsLoading(false);
  }, []);

  const deleteUser = (id) => {
    const nextUsers = users.filter((user) => user.id !== id);
    setUsers(nextUsers);
    setStats(calculateStats(nextUsers));
  };

  const updateUser = (updatedUser) => {
    const nextUsers = users.map((user) =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
    );
    setUsers(nextUsers);
    setStats(calculateStats(nextUsers));
  };

  return (
    <UsersContext.Provider
      value={{ users, stats, isLoading, deleteUser, updateUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
