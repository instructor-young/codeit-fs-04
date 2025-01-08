import Link from "next/link";

async function BreedPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const breed = params.breed;
  const color = searchParams.color;

  return (
    <div>
      <h1>이곳은 강아지 {breed} 종의 페이지입니다</h1>
      <p>강아지는 {color} 색이에요</p>

      <Link href="/">홈페이지로 돌아가기</Link>
    </div>
  );
}

export default BreedPage;
