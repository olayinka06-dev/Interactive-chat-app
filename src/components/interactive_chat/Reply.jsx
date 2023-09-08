"use client";
import React, { useState, useEffect } from "react";
import { useInteractiveChatContext } from "../provider/Context";
import { useReplyContext } from "../provider/ReplyContext";
import { useCommentContext } from "../provider/CommentContext";
import { ShowReply } from "../entities/Entity";
import { BiCheck, BiCopy } from "react-icons/bi";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineMoreVert } from "react-icons/md";

const Reply = () => {
  const { chatData } = useInteractiveChatContext();
  const { comment } = useCommentContext();
  const { reply, handleReplySubmit } = useReplyContext();

  const showDeleteButton = chatData.isCommentBySpecificUsers(comment);

  const isCurrentUser = chatData.currentUser.username === reply.user.username;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);
  const [showReply, setShowReply] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    // Use the comment's ID as a unique key in local storage
    const storedCounter = localStorage.getItem(`counter_${reply.id}`);
    if (storedCounter) {
      setCounter(JSON.parse(storedCounter));
    } else {
      // If no counter is found in local storage, set the initial counter value
      setCounter(0);
    }
  }, [reply.id]);

  // Save Counter to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(`counter_${reply.id}`, JSON.stringify(counter));
  }, [counter, reply.id]);

  const handleEditSubmit = () => {
    if (editedContent) {
      chatData.handleEditReply(reply.id, editedContent);
      setIsEditing(false);
    }
  };

  const handleShowReply = () => {
    setShowReply(!showReply);
  };

  return (
    <section className="">
      <div className="mb-2 bg-white rounded-lg p-4">
        <div className="">
          <div className="flex flex-row justify-between gap-2 p-3 w-32 rounded bg-[rgb(245,246,250)]">
            <button onClick={() => counter >= 0 && setCounter(counter + 1)}>
              <img src="/images/icon-plus.svg" alt="" />
            </button>
            <span>{counter}</span>
            <button onClick={() => counter > 0 && setCounter(counter - 1)}>
              <img src="/images/icon-minus.svg" alt="" />
            </button>
          </div>
        </div>
        <div className="flex gap-3 md:gap-0 flex-col-reverse md:flex-row justify-between">
          <div className="flex md:gap-5 gap-3 justify-start md:justify-between items-start md:items-center mb-2">
            <img
              src={reply.user.image.png}
              alt={reply.user.username}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span>{reply.createdAt}</span>
            <span className="font-semibold">{reply.user.username}</span>
          </div>
          <div className="flex justify-end md:items-center gap-3">
            <button
              className="text-green-500 md:px-4 py-1 rounded flex items-center gap-2"
              onClick={() => chatData.handlePlayReply(reply.content)}
            >
              <BsFillPlayFill /> <span className="md:block hidden">Play</span>
            </button>
            {/* Add Copy button */}
            <button
              className="text-blue-500 md:px-4 py-1 rounded flex items-center gap-2"
              onClick={() => {
                chatData.handleCopyReply(reply.content),
                  setIsCopy(true),
                  setTimeout(() => {
                    setIsCopy(false);
                  }, 2000);
              }}
            >
              {isCopy ? <BiCheck /> : <BiCopy />}{" "}
              <span className="md:block hidden">
                {isCopy ? "Copied!" : "Copy"}
              </span>
            </button>
            <button
              onClick={handleShowReply}
              className="text-[rgb(79,78,156)] border-none gap-2 flex items-center border"
            >
              <FaShare />
              <span className="md:block hidden">Reply</span>
            </button>
            {showDeleteButton && (
              <button
                className="text-red-500 rounded flex items-center gap-2"
                onClick={() => chatData.handleDeleteReply(reply.id)}
              >
                <AiTwotoneDelete />{" "}
                <span className="md:block hidden">Delete</span>
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
        <p>{reply.content}</p>
        {isCurrentUser && isEditing && (
          <div className="mt-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows="2"
            />
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={handleEditSubmit}
            >
              Save Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {showReply && <ShowReply setShowReply={setShowReply} />}
    </section>
  );
};

export default Reply;
