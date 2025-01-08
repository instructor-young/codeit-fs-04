import Footer from "./_components/Footer";
import Header from "./_components/Header";
import styles from "./_styles/RootLayout.module.scss";

function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <main className={styles.page}>{children}</main>
      <Footer />
    </div>
  );
}

export default RootLayout;
