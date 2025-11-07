import { useState } from "react";
import "./App.css";
import { geminiService } from "./services/geminiService";

function App() {
  const [content, setContent] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [chatResult, setChatResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const fetchDataToSearch = async (question: string) => {
    if (!question) return;
    setIsLoadingSearch(true);
    try {
      const res = await geminiService.callSearch(question);
      setSearchResult(res.answer || "Không có kết quả trả về");
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const fetchDataFromChat = async (question: string) => {
    if (!question) return;
    setIsLoading(true);
    try {
      const res = await geminiService.callChat(question);
      setChatResult("checl res", res);
      setChatResult(res.answer || "Không có kết quả trả về");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-semibold mb-8">Nhập câu hỏi</h1>

      {/* Input + Buttons */}
      <div className="w-full max-w-2xl flex flex-col gap-4 items-center">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoadingSearch || isLoading}
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-400 focus:outline-none text-lg disabled:opacity-50"
          placeholder="Nhập câu hỏi..."
        />

        <div className="flex gap-4">
          <button
            onClick={() => fetchDataToSearch(content)}
            disabled={isLoadingSearch}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoadingSearch && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Search
          </button>

          <button
            onClick={() => fetchDataFromChat(content)}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Chat
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="w-full max-w-6xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-400 mb-3">
            Kết quả Search
          </h2>
          <p className="whitespace-pre-line text-gray-200 leading-relaxed">
            {searchResult}
          </p>
        </div>

        <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-green-400 mb-3">
            Kết quả Chat
          </h2>
          <p className="whitespace-pre-line text-gray-200 leading-relaxed">
            {chatResult}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
