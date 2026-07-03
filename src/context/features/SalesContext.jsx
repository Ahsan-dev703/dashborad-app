import { createContext, useContext, useEffect, useState } from "react";

const SalesContext = createContext(null);

const INITIAL_SALES = [
  { id: 1, channel: "Website", value: 45600 },
  { id: 2, channel: "Mobile App", value: 38200 },
  { id: 3, channel: "Marketplace", value: 29800 },
  { id: 4, channel: "Social Media", value: 18700 },
];

const INITIAL_SALES_TREND = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 3800 },
  { month: "Mar", sales: 5100 },
  { month: "Apr", sales: 4600 },
  { month: "May", sales: 5400 },
  { month: "Jun", sales: 7200 },
];

export const SalesProvider = ({ children }) => {
  const [salesChannels, setSalesChannels] = useState(INITIAL_SALES);
  const [salesTrend, setSalesTrend] = useState(INITIAL_SALES_TREND);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setSalesChannels(INITIAL_SALES);
    setSalesTrend(INITIAL_SALES_TREND);
    setIsLoading(false);
  }, []);

  const updateChannel = (channel) => {
    const next = salesChannels.map((c) =>
      c.id === channel.id ? { ...c, ...channel } : c,
    );
    setSalesChannels(next);
  };

  const deleteChannel = (id) => {
    setSalesChannels((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <SalesContext.Provider
      value={{
        salesChannels,
        salesTrend,
        isLoading,
        updateChannel,
        deleteChannel,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => useContext(SalesContext);
