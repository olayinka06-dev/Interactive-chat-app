"use client";
import { createContext, useContext } from "react";

export const ReplyContext = createContext({
  reply: {
    id: "",
    content: "",
    createdAt: "",
    score: "",
    replyingTo: "",
    user: {
      image: {
        png: "",
        webp: "",
      },
      username: "",
    },
  },
});

export const useReplyContext = () => (
    useContext(ReplyContext)
)
