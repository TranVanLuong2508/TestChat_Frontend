import publicAxios from "../config/axios";

export const geminiService = {
  callChat: (questionContent: string) => {
    return publicAxios.post("/chat", {
      question: questionContent,
    });
  },
  callSearch: (questionContent: string) => {
    return publicAxios.post("/search", {
      question: questionContent,
    });
  },
};
