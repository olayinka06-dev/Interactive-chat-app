"use client";
import Comment from '@/components/interactive_chat/Comment';
import CommentForm from '@/components/interactive_chat/CommentForm';
import { useInteractiveChatContext } from '@/components/provider/Context';
import React, { createContext, useContext } from 'react';

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

const Home = () => {
  const { chatData } = useInteractiveChatContext()
  return (
    <section>
      <div className="container">
        {
          chatData.comments.map((comment)=> (
            <CommentContext.Provider value={{ comment }}>
              <Comment key={comment.id}/>
            </CommentContext.Provider>
          ))
        }
        <CommentForm/>
      </div>
    </section>
  )
}

export default Home