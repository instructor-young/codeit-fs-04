"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../../api";
import styles from "./BreedPage.module.scss";

function BreedPage() {
  const params = useParams();
  const breedId = params.breedId;
  const [breed, setBreed] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    api.getBreed(breedId).then((data) => setBreed(data));
  }, [breedId]);

  useEffect(() => {
    if (!breed) return;

    api.getImageById(breed.reference_image_id).then((data) => setImage(data));
  }, [breed]);

  if (!breed || !image) return;

  return (
    <div>
      <h1 className={styles.name}>{breed.name}</h1>

      <img className={styles.image} src={image.url} />

      <ul className={styles.content}>
        <li>
          <h5>성격/기질</h5>
          <p>{breed.temperament}</p>
        </li>

        <li>
          <h5>기대수명</h5>
          <p>{breed.life_span}</p>
        </li>

        <li>
          <h5>일반적인 양육 목적</h5>
          <p>{breed.bred_for}</p>
        </li>
      </ul>
    </div>
  );
}

export default BreedPage;
