import "./App.css";
import Blog from "./components/Blog";

function App() {
  return (
    <div>
      <h1 className="text-lg font-bold underline text-green-500 text-center mb-4">
        API 통신해서 리스트 렌더링하기
      </h1>

      <Blog />
    </div>
  );
}

export default App;
