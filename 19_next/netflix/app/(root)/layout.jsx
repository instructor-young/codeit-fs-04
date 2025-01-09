import Header from "./_components/Header";

function RootLayout({ children }) {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      {children}
    </div>
  );
}

export default RootLayout;
