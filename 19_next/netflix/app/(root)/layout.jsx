import Header from "./_components/Header";

function RootLayout({ children }) {
  return (
    <div className="text-white min-h-screen">
      <Header />
      {children}
    </div>
  );
}

export default RootLayout;
