import Header from "./_components/Header";

function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default RootLayout;
