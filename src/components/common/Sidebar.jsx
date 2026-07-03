import {
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "#6366f1",
    href: "/",
  },
  { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
  { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
  { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true,
  );
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setWidth(w);
      if (w >= 768) setIsSidebarOpen(true);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handler = () => setIsSidebarOpen((s) => !s);
    window.addEventListener("toggleSidebar", handler);
    return () => window.removeEventListener("toggleSidebar", handler);
  }, []);

  // Mobile overlay when open on small screens
  const isMobile = width < 768;
  const isDesktop = !isMobile;

  return (
    <>
      {/* Mobile floating button removed — header controls sidebar */}

      {/* Sidebar panel */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.aside
            initial={
              isMobile ? { x: -300 } : { width: isSidebarOpen ? 256 : 80 }
            }
            animate={isMobile ? { x: 0 } : { width: isSidebarOpen ? 256 : 80 }}
            exit={isMobile ? { x: -300 } : { width: 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={isMobile ? {} : { width: isSidebarOpen ? 256 : 80 }}
            className={`z-30 ${isMobile ? "fixed inset-y-0 left-0" : "relative"}`}
          >
            <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700 min-h-screen overflow-hidden">
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen((s) => !s)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
                  aria-label="Toggle sidebar"
                >
                  <Menu size={24} />
                </motion.button>
                {isMobile && (
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition"
                    aria-label="Close sidebar"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <nav className="mt-6 flex-grow">
                {SIDEBAR_ITEMS.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `block mb-2 ${isActive ? "bg-gray-700 ring-1 ring-indigo-500 rounded-lg" : ""}`
                    }
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                  >
                    <motion.div
                      className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors ${isDesktop && !isSidebarOpen ? "justify-center" : ""}`}
                    >
                      <item.icon
                        size={20}
                        style={{ color: item.color, minWidth: "20px" }}
                      />
                      <AnimatePresence>
                        {(isSidebarOpen || !isDesktop) && (
                          <motion.span
                            className="ml-4 whitespace-nowrap"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile backdrop when sidebar open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
};
export default Sidebar;
