"use client";

import { useEffect, useState } from "react";
import api from "../../api/index";
import BreedCard from "./_components/BreedCard";
import styles from "./_styles/HomePage.module.scss";

function HomePage() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    api.getBreeds().then((data) => {
      setBreeds(data);
    });
  }, []);

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
