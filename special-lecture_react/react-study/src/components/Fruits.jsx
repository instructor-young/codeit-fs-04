function Fruits(props) {
  return (
    <ul className="px-5 flex flex-wrap gap-1">
      {props.fruits.map((fruit, index) => (
        <li
          key={`${fruit}-${index}`}
          onClick={() => alert(fruit)}
          className="text-xs bg-sky-400 text-white p-1"
        >
          {fruit}
        </li>
      ))}
    </ul>
  );
}

export default Fruits;
