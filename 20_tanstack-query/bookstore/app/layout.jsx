"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const queryClient = new QueryClient();

function HTMLLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ko">
        <body className={"antialiased"}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}

export default HTMLLayout;
