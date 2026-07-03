import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext(null);

const INITIAL_ORDERS = [
  {
    id: "ORD001",
    customer: "John Doe",
    total: 235.4,
    status: "Delivered",
    date: "2023-07-01",
    items: [
      { name: "Widget", qty: 2, price: 50 },
      { name: "Gadget", qty: 1, price: 135.4 },
    ],
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    total: 412.0,
    status: "Processing",
    date: "2023-07-02",
    items: [{ name: "Thing", qty: 4, price: 103 }],
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    total: 162.5,
    status: "Shipped",
    date: "2023-07-03",
    items: [
      { name: "Item A", qty: 1, price: 62.5 },
      { name: "Item B", qty: 1, price: 100 },
    ],
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    total: 750.2,
    status: "Pending",
    date: "2023-07-04",
    items: [{ name: "Large", qty: 2, price: 375.1 }],
  },
  {
    id: "ORD005",
    customer: "Charlie Wilson",
    total: 95.8,
    status: "Delivered",
    date: "2023-07-05",
    items: [{ name: "Small", qty: 2, price: 47.9 }],
  },
];

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setOrders(INITIAL_ORDERS);
    setIsLoading(false);
  }, []);

  const getOrder = (id) => orders.find((o) => o.id === id);

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrdersContext.Provider
      value={{ orders, isLoading, getOrder, deleteOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
