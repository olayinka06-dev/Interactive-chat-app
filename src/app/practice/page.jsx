"use client";
import Comment from '@/components/interactive_chat/Comment';
import CommentForm from '@/components/interactive_chat/CommentForm';
import { CommentContext } from '@/components/provider/CommentContext';
import { useInteractiveChatContext } from '@/components/provider/Context';

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