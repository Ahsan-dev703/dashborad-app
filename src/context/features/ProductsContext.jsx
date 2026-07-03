import { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext(null);

const INITIAL_STATS = {
  totalProducts: 1234,
  topSelling: 89,
  lowStock: 23,
  totalRevenue: "$543,210",
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 59.99,
    stock: 143,
    sales: 1200,
  },
  {
    id: 2,
    name: "Leather Wallet",
    category: "Accessories",
    price: 39.99,
    stock: 89,
    sales: 800,
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 56,
    sales: 650,
  },
  {
    id: 4,
    name: "Yoga Mat",
    category: "Fitness",
    price: 29.99,
    stock: 210,
    sales: 950,
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "Home",
    price: 79.99,
    stock: 78,
    sales: 720,
  },
];

const INITIAL_SALES_TREND = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
];

const INITIAL_CATEGORY_DATA = [
  { name: "Electronics", value: 1200 },
  { name: "Accessories", value: 800 },
  { name: "Fitness", value: 950 },
  { name: "Home", value: 720 },
  { name: "Beauty", value: 430 },
];

const calculateStats = (items) => {
  const totalProducts = items.length;
  const topSelling = items.reduce(
    (max, product) => Math.max(max, product.sales),
    0,
  );
  const lowStock = items.filter((product) => product.stock <= 50).length;
  const totalRevenue = items.reduce(
    (sum, product) => sum + product.price * product.sales,
    0,
  );

  return {
    totalProducts,
    topSelling,
    lowStock,
    totalRevenue: `$${Math.round(totalRevenue).toLocaleString()}`,
  };
};

export const ProductsProvider = ({ children }) => {
  const [stats, setStats] = useState(() => calculateStats(INITIAL_PRODUCTS));
  const [products, setProducts] = useState([]);
  const [salesTrendData, setSalesTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = () => {
      setIsLoading(true);

      setProducts(INITIAL_PRODUCTS);
      setSalesTrendData(INITIAL_SALES_TREND);
      setCategoryData(INITIAL_CATEGORY_DATA);
      setStats(calculateStats(INITIAL_PRODUCTS));

      setIsLoading(false);
    };

    fetchProductData();
  }, []);

  const deleteProduct = (id) => {
    const nextProducts = products.filter((product) => product.id !== id);
    setProducts(nextProducts);
    setStats(calculateStats(nextProducts));
  };

  const updateProduct = (updatedProduct) => {
    const nextProducts = products.map((product) =>
      product.id === updatedProduct.id
        ? { ...product, ...updatedProduct }
        : product,
    );
    setProducts(nextProducts);
    setStats(calculateStats(nextProducts));
  };

  return (
    <ProductsContext.Provider
      value={{
        stats,
        products,
        salesTrendData,
        categoryData,
        isLoading,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
