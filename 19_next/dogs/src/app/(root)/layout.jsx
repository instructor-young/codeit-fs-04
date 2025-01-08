import Footer from "./_components/Footer";
import Header from "./_components/Header";

function RootLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;
