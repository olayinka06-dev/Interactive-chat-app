"use client";
import Comment from '@/components/interactive_chat/Comment';
import { useInteractiveChatContext } from '@/components/provider/Context';
import React, { createContext, useContext } from 'react';

export const CommentContext = createContext();

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
              <Comment/>
            </CommentContext.Provider>
          ))
        }
      </div>
    </section>
  )
}

export default Home