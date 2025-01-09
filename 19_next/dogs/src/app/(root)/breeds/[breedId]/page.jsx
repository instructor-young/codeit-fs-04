import Image from "next/image";
import api from "../../../../api";
import styles from "./BreedPage.module.scss";

async function BreedPage(props) {
  const params = await props.params;
  const breedId = params.breedId;
  const breed = await api.getBreed(breedId);
  const image = await api.getImageById(breed.reference_image_id);

  if (!breed || !image) return;

  return (
    <div>
      <h1 className={styles.name}>{breed.name}</h1>

      <Image
        alt={breed.name}
        className={styles.image}
        src={image.url}
        width={300}
        height={300}
      />

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
