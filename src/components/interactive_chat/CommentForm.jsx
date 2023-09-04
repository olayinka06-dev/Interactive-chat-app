"use client";
import React, { useState, useEffect } from "react";
import { useInteractiveChatContext } from "../provider/Context";

const CommentForm = () => {
  const { chatData } = useInteractiveChatContext();

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      chatData.handleAddComment(content);
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-5 rounded-lg bg-white flex justify-between gap-4"
    >
      <img
        src={chatData.currentUser.image.png}
        alt={chatData.currentUser.username}
        className="w-8 h-8 rounded-full mr-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Add a comment..."
        rows="3"
      />
      <div className="">
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
