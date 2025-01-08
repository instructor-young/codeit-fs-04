import Link from "next/link";
import styles from "./BreedCard.module.scss";

function BreedCard({ breed }) {
  return (
    <Link href={`/breeds/${breed.id}`} className={styles.link}>
      <img alt={breed.name} src={breed.image.url} className={styles.image} />
      <h6 className={styles.title}>{breed.name}</h6>
    </Link>
  );
}

export default BreedCard;
