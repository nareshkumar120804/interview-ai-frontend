import { createContext, useEffect, useState } from "react";
import { getMe, logout } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 AUTH CHECK ON APP START
  useEffect(() => {
    const init = async () => {
      try {
        const isSessionActive = sessionStorage.getItem("sessionActive");
        if (!isSessionActive) {
          // New session: force logout to clear old cookies and start clean
          try {
            await logout();
          } catch (logoutErr) {
            // Ignore errors if logout fails (e.g. backend down)
          }
          sessionStorage.setItem("sessionActive", "true");
          setUser(null);
        } else {
          // Active session: check if user is already logged in
          const res = await getMe();
          setUser(res.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};