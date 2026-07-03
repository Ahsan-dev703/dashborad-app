import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import { useOrders } from "../../context/features/OrdersContext";
import Modal from "../common/Modal";
import ActionButton from "../common/ActionButton";

const OrdersTable = () => {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders || []);
  const [viewingOrder, setViewingOrder] = useState(null);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = (orders || []).filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term),
    );
    setFilteredOrders(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Order List</h2>
        <div className="relative mt-3 sm:mt-0">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full sm:w-64 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide divide-gray-700">
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <ActionButton
                    onClick={() => setViewingOrder(order)}
                    ariaLabel={`View ${order.id}`}
                  >
                    <Eye size={18} />
                  </ActionButton>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={Boolean(viewingOrder)}
        title={viewingOrder ? `Order ${viewingOrder.id}` : "Order Details"}
        description={
          viewingOrder ? `Customer: ${viewingOrder.customer}` : undefined
        }
        onClose={() => setViewingOrder(null)}
        footer={
          <>
            <button
              onClick={() => setViewingOrder(null)}
              className="rounded-2xl border border-gray-700 bg-transparent px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-white hover:text-white"
            >
              Close
            </button>
          </>
        }
      >
        {viewingOrder && (
          <div className="space-y-3">
            <div className="text-sm text-gray-300">
              Order ID: {viewingOrder.id}
            </div>
            <div className="text-sm text-gray-300">
              Customer: {viewingOrder.customer}
            </div>
            <div className="text-sm text-gray-300">
              Total: ${viewingOrder.total.toFixed(2)}
            </div>
            <div className="text-sm text-gray-300">
              Status: {viewingOrder.status}
            </div>
            <div className="text-sm text-gray-300">
              Date: {viewingOrder.date}
            </div>
            {viewingOrder.items && (
              <div>
                <h4 className="text-sm font-medium text-gray-100 mt-3">
                  Items
                </h4>
                <ul className="text-sm text-gray-300 mt-2">
                  {viewingOrder.items.map((it, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>
                        {it.name} x{it.qty}
                      </span>
                      <span>${it.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
};
export default OrdersTable;
