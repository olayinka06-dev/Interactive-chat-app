"use client";
import React, { useEffect, useState } from "react";
import { useInteractiveChatContext } from "../provider/Context";
import Reply from "./Reply";
import { ReplyContext } from "../provider/ReplyContext";
import { useCommentContext } from "../provider/CommentContext";
import { BiCheck, BiCopy } from "react-icons/bi";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { FaShare } from "react-icons/fa";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { CgMoreVerticalO } from "react-icons/cg";
import { MdOutlineMoreVert } from "react-icons/md";

const Comment = () => {
  const { chatData } = useInteractiveChatContext();
  const { comment } = useCommentContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplyArea, setShowReplyArea] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isCopy, setIsCopy] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // const showDeleteButton = chatData.isCommentBySpecificUsers(comment);

  const isCurrentUser = chatData.currentUser.username === comment.user.username;

  useEffect(() => {
    // Use the comment's ID as a unique key in local storage
    const storedCounter = localStorage.getItem(`counter_${comment.id}`);
    if (storedCounter) {
      setCounter(JSON.parse(storedCounter));
    } else {
      // If no counter is found in local storage, set the initial counter value
      setCounter(0);
    }
  }, [comment.id]);

  // Save Counter to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(`counter_${comment.id}`, JSON.stringify(counter));
  }, [counter, comment.id]);

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

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <section className="">
      {/* My Own Chat */}
      <div className="bg-white  px-4 py-7 shadow rounded-lg mb-4">
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
              src={comment.user.image.png}
              alt={comment.user.username}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{comment.createdAt}</span>
            <span className="font-semibold">{comment.user.username}</span>
          </div>
          <div className=" flex justify-end md:items-center gap-3">
            <button onClick={handleShowMenu} className="block md:hidden p-1 border-[2px] border-solid border-[rgb(245,246,250)] rounded-full hover:bg-[rgb(245,246,250)]">
              <MdOutlineMoreVert/>
            </button>
            <div className={`${showMenu ? "flex": "hidden"} items-center md:flex gap-3`}>
            <button
              className="text-green-500 md:px-4 py-1 rounded flex items-center gap-2"
              onClick={() => chatData.handlePlayComment(comment.content)}
            >
              <BsFillPlayFill /> <span className="md:block hidden">Play</span>
            </button>
            {/* Copy button */}
            <button
              className="text-blue-500 md:px-4 py-1 rounded flex items-center gap-2"
              onClick={() => {
                chatData.handleCopyComment(comment.content),
                  setIsCopy(true),
                  setTimeout(() => {
                    setIsCopy(false);
                  }, 2000);
              }}
            >
              {isCopy ? <BiCheck /> : <BiCopy />}{" "}
              <span className="md:block hidden">{isCopy ? "Copied!":"Copy"}</span>
            </button>
            {/* Copy button */}

            {/* Reply button */}
            <button
              onClick={handleShowReply}
              className="text-[rgb(79,78,156)] border-none gap-2 flex items-center border"
            >
              <FaShare />
              <span className="md:block hidden">Reply</span>
            </button>
            {/* Reply button */}

            {/* Delete button */}
            {chatData.currentUser && (
              <button
                className="text-red-500 md:px-4 py-1 rounded flex items-center gap-2"
                onClick={() => chatData.handleDeleteComment(comment.id)}
              >
                <AiTwotoneDelete />{" "}
                <span className="md:block hidden">Delete</span>
              </button>
            )}
            {/* Delete button */}
            {isCurrentUser && !isEditing && (
              <button
                className=" text-blue-500 px-2 py-1 flex items-center gap-2 rounded"
                onClick={() => setIsEditing(true)}
              >
                <AiFillEdit/>
                <span className="md:block hidden">Edit Reply</span>
              </button>
            )}
            </div>
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
        )}
        {comment.replies.length > 0 && (
          <div className="mt-4 flex flex-col gap-5 pl-4 border-l">
            {comment.replies.map((reply) => (
              <ReplyContext.Provider key={reply.id} value={{ reply, handleReplySubmit }}>
                <Reply />
              </ReplyContext.Provider>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Comment;
