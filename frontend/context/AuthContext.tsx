"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Loading from "@/components/common/Loading";

type AuthContextType = {
  isLoggedIn: boolean;
  nickname: string | null;
  isMounted: boolean;
  isLoading: boolean;
  isNavigating: string | null;
  setIsNavigating: (val: string | null) => void;
  login: (access: string, refresh: string, nickname: string) => void;
  logout: () => Promise<void>;
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

  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = () => {
      try {
        const access = localStorage.getItem("access");
        const nickname = localStorage.getItem("nickname");

        if (access && nickname) {
          setAuthState({
            isLoggedIn: true,
            nickname: nickname,
          });
        }
      } catch (e) {
        console.error("Auth initialization error:", e);
      } finally {
        setIsLoading(false);
      }
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

  const logout = async () => {
    // ローカルストレージのクリーンアップ
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("nickname");

    setAuthState({
      isLoggedIn: false,
      nickname: null,
    });

    // ハードリロードを伴う遷移（ステートを完全に初期化するため）
    window.location.href = "/";

    // 遷移が始まるまでの間、後続の処理（setIsNavigating(null)など）が
    // 走って画面がガタつくのを防ぐための待機
    await new Promise((resolve) => setTimeout(resolve, 5000));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isLoading,
        isMounted: !isLoading,
        isNavigating,
        setIsNavigating,
        login,
        logout,
      }}
    >
      {isNavigating && <Loading fullScreen message={isNavigating} />}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
