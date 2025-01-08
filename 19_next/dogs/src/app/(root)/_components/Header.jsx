import Link from "next/link";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          멍멍월드
        </Link>
      </div>
    </header>
  );
}

export default Header;
