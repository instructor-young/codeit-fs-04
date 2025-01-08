import Link from "next/link";
import styles from "./_styles/page.module.scss";
import "./_styles/page.scss";

export default function Home() {
  return (
    <main>
      {/* 파란색 글씨, 글자 크기는 24px, 가운데 정렬 */}
      <h1 className="page-title">Dogs API</h1>

      <section>
        <ul className={styles.dogCards}>
          {Array(16)
            .fill("강아지")
            .map((dog, index) => (
              <li key={index} className={styles.dogCard}>
                <Link href={`/breeds/${dog}`}>
                  <div className={styles.dogCardImg} />
                  <h6 className={styles.dogCardTitle}>
                    {dog} {index + 1}
                  </h6>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}

// 리액트의 스타일링 방법들
// 1. JSX 태그에 style을 직접 추가하는 방법 : 인라인 스타일링
// 2. CSS 파일에 스타일들을 적어놓은 후에, 그 CSS 파일을 임포트
