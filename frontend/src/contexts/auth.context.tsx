import React, { useState, useEffect, createContext } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
