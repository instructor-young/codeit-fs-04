"use client";

import api, { localClient } from "@/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      // 헤더에 accssToken
      localClient.defaults.headers.Authorization = `Bearer ${accessToken}`;

      // 로컬스토리지에 refreshToken
      localStorage.setItem("refreshToken", refreshToken);

      router.replace("/?");
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (isLoggedIn && pathname === "/auth/sign-up") router.replace("/");
  }, [isLoggedIn, pathname]);

  useEffect(() => {
    async function initializeLogInStatus() {
      try {
        // 1. 로컬스토리지를 뒤져서, 로그인 상태라는 단서를 찾음
        const prevRefreshToken = localStorage.getItem("refreshToken");
        if (!prevRefreshToken) return;

        // 2. 로그인 상태라는 단서가 있으면, 서버에 토큰을 요청
        await api.refreshToken(prevRefreshToken);

        // 3. isLoggedIn을 true로 변경
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("refreshToken");
      } finally {
        setIsAuthInitialized(true);
      }
    }

    initializeLogInStatus();
  }, []);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    setIsLoggedIn(false);

    // #1. api의 header에서 accessToken 제거
    localClient.defaults.headers["Authorization"] = "";

    // #2. localStorage에서 refreshToken 제거
    localStorage.removeItem("refreshToken");
  };

  const value = {
    isAuthInitialized,
    isLoggedIn,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 일반적으로,
// 토큰(JWT)방식의 인증을 사용할 때에는
// 토큰을 두 개 사용합니다.
// 하나는 accessToken : 매 요청에 실어서 보낸다. 신분증 그 자체. 유효기간이 매우 짧다.
// 하나는 refreshToken : accessToken을 다시 받아야 할 때에만 보낸다. 신분증을 갱신하기 위한 자료

// 하나는 로컬스토리지에 보관할거고 -> refreshToken
// 하나는 헤더에 작성해서 들고다닐거에요 -> accessToken

// 로그인을 할 때에
// 서버에서는 두 개의 토큰을 모두 발급해 줍니다.

// 그리고 브라우저는 두 개의 토큰을 가지고 있다가
// accessToken이 만료되었음을 알게 되면
// refreshToken으로 accessToken을 갱신하고 다시 요청을 보냄
