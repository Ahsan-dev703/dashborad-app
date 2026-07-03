import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useProducts } from "../../context/features/ProductsContext";
import Modal from "../common/Modal";
import ActionButton from "../common/ActionButton";

const ProductsTable = () => {
  const { products, updateProduct, deleteProduct } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [editingProduct, setEditingProduct] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    sales: "",
  });

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term),
    );

    setFilteredProducts(filtered);
  };

  const startEdit = (product) => {
    setEditingProduct(product);

    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      sales: product.sales.toString(),
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = () => {
    if (!editingProduct) return;

    updateProduct({
      id: editingProduct.id,
      name: editForm.name,
      category: editForm.category,
      price: parseFloat(editForm.price) || 0,
      stock: parseInt(editForm.stock, 10) || 0,
      sales: parseInt(editForm.sales, 10) || 0,
    });

    setEditingProduct(null);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    deleteProduct(id);

    if (editingProduct?.id === id) {
      setEditingProduct(null);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>

        <div className="relative mt-3 sm:mt-0">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-64 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
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
                Category
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Stock
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Sales
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                    alt="Product"
                    className="size-10 rounded-full"
                  />

                  {product.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.category}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${Number(product.price).toFixed(2)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.stock}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.sales}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                  <ActionButton
                    onClick={() => startEdit(product)}
                    ariaLabel="Edit product"
                  >
                    <Edit size={18} />
                  </ActionButton>

                  <ActionButton
                    onClick={() => handleDelete(product.id)}
                    colorClass="text-red-400 hover:text-red-300"
                    ariaLabel="Delete product"
                  >
                    <Trash2 size={18} />
                  </ActionButton>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={Boolean(editingProduct)}
        title="Edit Product"
        description="Update the product details and save your changes."
        onClose={cancelEdit}
        footer={
          <>
            <button
              onClick={cancelEdit}
              className="rounded-2xl border border-gray-700 bg-transparent px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-white hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={saveEdit}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Save Changes
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
            <span>Category</span>

            <input
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-blue-500"
            />
          </label>

          <label className="space-y-2 text-sm text-gray-200">
            <span>Price</span>

            <input
              name="price"
              type="number"
              step="0.01"
              value={editForm.price}
              onChange={handleEditChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-blue-500"
            />
          </label>

          <label className="space-y-2 text-sm text-gray-200">
            <span>Stock</span>

            <input
              name="stock"
              type="number"
              value={editForm.stock}
              onChange={handleEditChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-blue-500"
            />
          </label>

          <label className="space-y-2 text-sm text-gray-200 sm:col-span-2">
            <span>Sales</span>

            <input
              name="sales"
              type="number"
              value={editForm.sales}
              onChange={handleEditChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-blue-500"
            />
          </label>
        </div>
      </Modal>
    </motion.div>
  );
};

export default ProductsTable;
