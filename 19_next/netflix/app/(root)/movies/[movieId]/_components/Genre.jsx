function Genre({ genre }) {
  return (
    <button className="bg-white text-black px-2.5 text-sm py-1 rounded-md font-bold">
      {genre.name}
    </button>
  );
}

export default Genre;
