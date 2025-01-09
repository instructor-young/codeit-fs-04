import api from "../../api";
import BreedCard from "./_components/BreedCard";
import styles from "./_styles/HomePage.module.scss";

async function HomePage() {
  const breeds = await api.getBreeds();

  return (
    <section>
      <ul className={styles.dogCards}>
        {breeds.map((breed) => (
          <li key={breed.id}>
            <BreedCard breed={breed} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HomePage;
