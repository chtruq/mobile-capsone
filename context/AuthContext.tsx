import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  userToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userInfo: {
    id: string;
    email: string;
    iat: number;
    exp: number;
    name: string;
    phone: string;
  } | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        const decoded: any = jwtDecode(token);
        if (isTokenExpired(decoded.exp)) {
          handleLogout();
        } else {
          setUserToken(token);
          scheduleAutoLogout(decoded.exp);
          setIsAuthenticated(true);
          const userInfo = await SecureStore.getItemAsync("userInfo");
          if (userInfo) {
            setUserInfo(JSON.parse(userInfo));
          }
        }
      }
    };
    checkTokenExpiration();
  }, []);

  const isTokenExpired = (exp: number) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp;
  };

  const scheduleAutoLogout = (exp: number) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = (exp - currentTime) * 1000;

    if (timeUntilExpiry > 0) {
      setTimeout(() => {
        handleLogout();
      }, timeUntilExpiry);
    }
  };

  const login = async (token: string) => {
    setUserToken(token);
    await SecureStore.setItemAsync("userToken", token);
    const decoded: any = jwtDecode(token);
    if (!decoded || Object.keys(decoded).length === 0) {
      handleLogout();
      return;
    }
    setIsAuthenticated(true);
    scheduleAutoLogout(decoded.exp);
    setUserInfo(decoded);
    await SecureStore.setItemAsync("userInfo", JSON.stringify(decoded));
  };

  const handleLogout = async () => {
    setUserToken(null);
    setIsAuthenticated(false);
    setUserInfo(null);
    await SecureStore.deleteItemAsync("userToken");
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout: handleLogout,
        isAuthenticated: !!userToken,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
