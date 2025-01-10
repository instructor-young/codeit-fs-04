import Star from "@/assets/img/star.png";
import Image from "next/image";

function Rating({ rating }) {
  const numOfStars = Math.floor(rating / 2);

  return (
    <div className="flex gap-x-1 items-center">
      <span className="text-lg font-bold mr-4">{rating}점</span>

      {Array(numOfStars)
        .fill("-")
        .map((_, index) => (
          <Image key={index} src={Star.src} alt="star" width={28} height={28} />
        ))}
    </div>
  );
}

export default Rating;
