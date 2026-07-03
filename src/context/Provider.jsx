import React from "react";
import { AuthProvider } from "./features/AuthContext";
import { OverviewProvider } from "./features/OverviewContext";
import { ProductsProvider } from "./features/ProductsContext";
import { UsersProvider } from "./features/UsersContext";
import { SalesProvider } from "./features/SalesContext";
import { OrdersProvider } from "./features/OrdersContext";
import { SettingsProvider } from "./features/SettingsContext";
import { AnalyticsProvider } from "./features/AnalyticsContext";

const Provider = ({ children }) => {
  return (
    <>
      <OverviewProvider>
        <AnalyticsProvider>
          <ProductsProvider>
            <UsersProvider>
              <SalesProvider>
                <OrdersProvider>
                  <SettingsProvider>
                    <AuthProvider>{children}</AuthProvider>
                  </SettingsProvider>
                </OrdersProvider>
              </SalesProvider>
            </UsersProvider>
          </ProductsProvider>
        </AnalyticsProvider>
      </OverviewProvider>
    </>
  );
};

export default Provider;
