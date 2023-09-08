"use client";
import React from "react";
import { useInteractiveChatContext } from "../provider/Context";
import { useReplyContext } from "../provider/ReplyContext";

export const ShowReply = ({ setShowReply }) => {
  const { chatData } = useInteractiveChatContext();
  const { handleReplySubmit } = useReplyContext();
  return (
    <div className="mt-2 bg-white p-5 rounded-lg flex gap-4 justify-between">
      <img
        src={chatData.currentUser.image.png}
        alt={chatData.currentUser.username}
        className="w-10 h-10 rounded-full mr-2"
      />
      <textarea
        value={chatData.replyContent}
        onChange={(e) => chatData.setReplyContent(e.target.value)}
        placeholder="Add a reply..."
        className="w-full p-2 border rounded"
        rows="2"
      />
      <div className="">
        <button
          className=" bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={() => {
            setShowReply(false), handleReplySubmit();
          }}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export const CommentReply = ({ handleReplySubmit }) => {
  const { chatData } = useInteractiveChatContext();
  return (
    <div className="mt-2 bg-white p-5 rounded-lg flex gap-4 justify-between">
      <img
        src={chatData.currentUser.image.png}
        alt={chatData.currentUser.username}
        className="w-10 h-10 rounded-full mr-2"
      />
      <textarea
        value={chatData.replyContent}
        onChange={(e) => chatData.setReplyContent(e.target.value)}
        placeholder="Add a reply..."
        className="w-full p-2 border rounded"
        rows="2"
      />
      <div className="">
        <button
          className=" bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={handleReplySubmit}
        >
          Reply
        </button>
      </div>
    </div>
  );
};
