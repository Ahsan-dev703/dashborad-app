import { createContext, useContext, useEffect, useState } from "react";

const AnalyticsContext = createContext(null);

const INITIAL_STATS = {
  monthlyRevenue: "$124,560",
  avgOrderValue: "$68.42",
  conversionRate: "3.8%",
  returningCustomers: "24%",
};

const INITIAL_REVENUE_TREND = [
  { month: "Jul", revenue: 12000 },
  { month: "Aug", revenue: 11000 },
  { month: "Sep", revenue: 15000 },
  { month: "Oct", revenue: 14000 },
  { month: "Nov", revenue: 16000 },
  { month: "Dec", revenue: 20000 },
  { month: "Jan", revenue: 18000 },
];

const INITIAL_TRAFFIC_SOURCES = [
  { name: "Organic", value: 54000 },
  { name: "Paid", value: 22000 },
  { name: "Referral", value: 12000 },
  { name: "Social", value: 9000 },
];

export const AnalyticsProvider = ({ children }) => {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [trafficSources, setTrafficSources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = () => {
      setIsLoading(true);
      setRevenueTrend(INITIAL_REVENUE_TREND);
      setTrafficSources(INITIAL_TRAFFIC_SOURCES);
      setStats(INITIAL_STATS);
      setIsLoading(false);
    };

    fetchAnalytics();
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{ stats, revenueTrend, trafficSources, isLoading }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
