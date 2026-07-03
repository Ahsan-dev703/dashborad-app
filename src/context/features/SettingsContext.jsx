import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

const INITIAL_SETTINGS = {
  profile: { name: "Admin User", timezone: "UTC", locale: "en-US" },
  connectedAccounts: [
    { id: "stripe", name: "Stripe", connected: false },
    { id: "google", name: "Google", connected: true },
  ],
  notifications: { email: true, sms: false, push: true },
  security: { twoFactorEnabled: false, lastPasswordChange: "2024-01-01" },
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setSettings(INITIAL_SETTINGS);
      setIsLoading(false);
    }, 0);
  }, []);

  const updateProfile = (profile) =>
    setSettings((s) => ({ ...s, profile: { ...s.profile, ...profile } }));

  const toggleNotification = (key) =>
    setSettings((s) => ({
      ...s,
      notifications: { ...s.notifications, [key]: !s.notifications[key] },
    }));

  const connectAccount = (id) =>
    setSettings((s) => ({
      ...s,
      connectedAccounts: s.connectedAccounts.map((a) =>
        a.id === id ? { ...a, connected: true } : a,
      ),
    }));

  const disconnectAccount = (id) =>
    setSettings((s) => ({
      ...s,
      connectedAccounts: s.connectedAccounts.map((a) =>
        a.id === id ? { ...a, connected: false } : a,
      ),
    }));

  const updateSecurity = (partial) =>
    setSettings((s) => ({ ...s, security: { ...s.security, ...partial } }));

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        updateProfile,
        toggleNotification,
        connectAccount,
        disconnectAccount,
        updateSecurity,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
