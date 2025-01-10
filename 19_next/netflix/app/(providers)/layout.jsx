import { AuthProvider } from "@/contexts/AuthContext";

function ProvidersLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ProvidersLayout;
