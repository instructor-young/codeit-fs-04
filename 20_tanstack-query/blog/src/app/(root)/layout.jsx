"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./_components/Header";

const queryClient = new QueryClient();

function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default RootLayout;
