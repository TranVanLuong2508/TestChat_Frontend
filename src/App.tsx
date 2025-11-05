import { useState } from "react";
import "./App.css";
import publicAxios from "./config/axios";
function App() {
  const [content, setContent] = useState("");

  const fetchData = async (question: string) => {
    const res = await publicAxios.get("/search", {
      params: {
        question,
      },
    });
    console.log("check res", res);
  };
  return (
    <>
      <h1>Nhập câu hỏi</h1>
      <input
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
        type="text"
      />
      <button
        onClick={() => {
          console.log("content submit", content);
          fetchData(content);
        }}
      >
        Submit
      </button>
    </>
  );
}

export default App;
