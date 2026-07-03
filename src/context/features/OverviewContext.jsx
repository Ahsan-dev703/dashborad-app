import { createContext, useContext, useState, useEffect } from "react";

const OverviewContext = createContext(null);

export const OverviewProvider = ({ children }) => {
  // Stat Cards Data State
  const [stats, setStats] = useState({
    totalSales: "$12,345",
    newUsers: "1,234",
    totalProducts: "567",
    conversionRate: "12.5%",
  });

  // Chart Data States
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [salesChannelData, setSalesChannelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call fetch
    const fetchDashboardData = () => {
      setIsLoading(true);

      setSalesData([
        { name: "Jul", sales: 4200 },
        { name: "Aug", sales: 3800 },
        { name: "Sep", sales: 5100 },
        { name: "Oct", sales: 4600 },
        { name: "Nov", sales: 5400 },
        { name: "Dec", sales: 7200 },
        { name: "Jan", sales: 6100 },
        { name: "Feb", sales: 5900 },
        { name: "Mar", sales: 6800 },
        { name: "Apr", sales: 6300 },
        { name: "May", sales: 7100 },
        { name: "Jun", sales: 7500 },
      ]);

      setCategoryData([
        { name: "Electronics", value: 4500 },
        { name: "Clothing", value: 3200 },
        { name: "Home & Garden", value: 2800 },
        { name: "Books", value: 2100 },
        { name: "Sports & Outdoors", value: 1900 },
      ]);

      setSalesChannelData([
        { name: "Website", value: 45600 },
        { name: "Mobile App", value: 38200 },
        { name: "Marketplace", value: 29800 },
        { name: "Social Media", value: 18700 },
      ]);

      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  return (
    <OverviewContext.Provider
      value={{ stats, salesData, categoryData, salesChannelData, isLoading }}
    >
      {children}
    </OverviewContext.Provider>
  );
};

export const useOverview = () => useContext(OverviewContext);
