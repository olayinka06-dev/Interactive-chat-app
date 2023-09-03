"use client";
import { createContext, useContext } from "react";

export const CommentContext = createContext({
    comment:
      {
        id: "",
        content: "",
        createdAt: "",
        score: "",
        user: {
          image: {
            png: "",
            webp: ""
          },
          username: "",
        },
        replies: [],
      }
  });
  
  export const useCommentContext = () => (
    useContext(CommentContext)
  )