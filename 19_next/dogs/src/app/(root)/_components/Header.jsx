import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/images/logo.png";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image alt="logo" src={logo.src} width={24} height={24} unoptimized />
          멍멍월드
        </Link>
      </div>
    </header>
  );
}

export default Header;
