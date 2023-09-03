"use client";
import React, { useState } from "react";
import { useInteractiveChatContext } from "../provider/Context";
import { useCommentContext } from "@/app/practice/page";
import Reply from "./Reply";
import { ReplyContext } from "../provider/ReplyProvider";

const Comment = () => {
  const { chatData } = useInteractiveChatContext();
  const { comment } = useCommentContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplyArea, setShowReplyArea] = useState(false);

  const showDeleteButton = chatData.isCommentBySpecificUsers(comment);

  const isCurrentUser = chatData.currentUser.username === comment.user.username;

  const handleReplySubmit = () => {
    if (chatData.replyContent) {
      chatData.handleReply(comment.id, chatData.replyContent);
      chatData.setReplyContent("");
    }
    setShowReplyArea(false);
  };

  const handleEditSubmit = () => {
    if (editedContent) {
      chatData.handleEditComment(comment.id, editedContent);
      setIsEditing(false);
    }
  };

  const handleShowReply = () => {
    setShowReplyArea(!showReplyArea);
  };

  return (
    <section className="">
      {/* My Own Chat */}

      <div className="bg-white px-4 py-7 shadow rounded-lg mb-4">
        <div className="flex gap-3 md:gap-0 flex-col-reverse md:flex-row justify-between">
          <div className="flex md:gap-5 gap-3 justify-start md:justify-between items-start md:items-center mb-2">
            <img
              src={comment.user.image.png}
              alt={comment.user.username}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{comment.createdAt}</span>
            <span className="font-semibold">{comment.user.username}</span>
          </div>
          <div className="flex justify-end md:items-center gap-3">
            <button
              className="text-green-500 md:px-4 py-1 rounded flex items-center gap-2"
              onClick={() => chatData.handlePlayComment(comment.content)}
            >
              <img src="/images/icon-play.svg" alt="" /> <span>Play</span>
            </button>
            {/* Add Copy button */}
            <button
              className="text-blue-500 md:px-4 py-1 rounded flex items-center gap-2"
              onClick={() => chatData.handleCopyComment(comment.content)}
            >
              <img src="/images/icon-copy.svg" alt="" /> <span>Copy</span>
            </button>
            <button
              onClick={handleShowReply}
              className="text-[rgb(79,78,156)] border-none gap-2 flex items-center border"
            >
              <img src="/images/icon-reply.svg" alt="" />
              Reply
            </button>
            {chatData.currentUser && (
              <button
                className="text-red-500 md:px-4 py-1 rounded flex items-center gap-2"
                onClick={() => chatData.handleDeleteComment(comment.id)}
              >
                <img src="/images/icon-delete.svg" alt="" /> <span>Delete</span>
              </button>
            )}
            {isCurrentUser && !isEditing && (
              <button
                className=" text-blue-500 px-2 py-1 flex items-center gap-2 rounded"
                onClick={() => setIsEditing(true)}
              >
                <img src="/images/icon-edit.svg" alt="" />
                <span>Edit Reply</span>
              </button>
            )}
          </div>
        </div>

        <p>{comment.content}</p>

        {isCurrentUser && isEditing && (
          <div className="mt-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            />
            <button
              className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              onClick={handleEditSubmit}
            >
              Save Edit
            </button>
            <button
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 ml-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* My Own Chat */}

      <div className="p-4 mb-4">
        {showReplyArea && (
          <div className="mt-2 bg-white p-5 rounded-lg flex gap-4 justify-between">
            <img
              src={chatData.currentUser.image.png}
              alt={chatData.currentUser.username}
              className="w-10 h-10 rounded-full mr-2"
            />
            <textarea
            value={chatData.replyContent}
            onChange={(e)=> chatData.setReplyContent(e.target.value)}
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
        )}
        {comment.replies.length > 0 && (
          <div className="mt-4 flex flex-col gap-5 pl-4 border-l">
            {comment.replies.map((reply) => (
              <ReplyContext.Provider value={{ reply, handleReplySubmit }}>
                <Reply
                  key={reply.id}
                  // reply={reply}
                  // currentUser={currentUser}
                  // onDelete={() => onDeleteReply(reply.id)}
                  // replyContent={replyContent}
                  // setReplyContent={setReplyContent}
                  // handleReplySubmit={handleReplySubmit}
                  // onEdit={(replyId, editedContent) =>
                  //   onEditReply(replyId, editedContent)
                  // }
                  // showDeleteButton={showDeleteButton}
                  // onCopyReply={onCopyReply}
                  // onPlayReply={onPlayReply}
                />
              </ReplyContext.Provider>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Comment;
