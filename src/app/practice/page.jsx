"use client";
import Comment from "@/components/interactive_chat/Comment";
import CommentForm from "@/components/interactive_chat/CommentForm";
import { CommentContext } from "@/components/provider/CommentContext";
import { useInteractiveChatContext } from "@/components/provider/Context";

const Home = () => {
  const { chatData } = useInteractiveChatContext();
  return (
    <section className="bg-[rgb(245,246,250)]">
      <div className="container flex items-center justify-center mx-auto p-4">
        <div className="w-full max-w-[1000px]">
          {chatData.comments.map((comment) => (
            <CommentContext.Provider key={comment.id} value={{ comment }}>
              <Comment />
            </CommentContext.Provider>
          ))}
          <CommentForm />
        </div>
      </div>
    </section>
  );
};

export default Home;
