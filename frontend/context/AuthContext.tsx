"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  nickname: string | null;
  isMounted: boolean;
  login: (access: string, refresh: string, nickname: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<{
    isLoggedIn: boolean;
    nickname: string | null;
  }>({
    isLoggedIn: false,
    nickname: null,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const initAuth = () => {
      const access = localStorage.getItem("access");
      const nickname = localStorage.getItem("nickname");

      if (access && nickname) {
        setAuthState({
          isLoggedIn: true,
          nickname: nickname,
        });
      }
      setIsMounted(true);
    };

    const timer = setTimeout(initAuth, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = (access: string, refresh: string, nickname: string) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("nickname", nickname);
    setAuthState({
      isLoggedIn: true,
      nickname: nickname,
    });
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("nickname");
    setAuthState({
      isLoggedIn: false,
      nickname: null,
    });
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        nickname: authState.nickname,
        isMounted,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
