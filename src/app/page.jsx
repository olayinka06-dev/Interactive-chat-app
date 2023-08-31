"use client";
import React, { useState } from "react";
import { data } from "./data";

const Comment = ({
  replyContent,
  setReplyContent,
  comment,
  currentUser,
  onReply,
  onDeleteComment,
  onDeleteReply,
  onEditComment,
  onEditReply,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplyArea, setShowReplyArea] = useState(false);

  const isCurrentUser = currentUser.username === comment.user.username;

  const handleReplySubmit = () => {
    if (replyContent) {
      onReply(comment.id, replyContent);
      setReplyContent("");
    }
    setShowReplyArea(false);
  };

  const handleEditSubmit = () => {
    if (editedContent) {
      onEditComment(comment.id, editedContent);
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
              onClick={handleShowReply}
              className="text-[rgb(79,78,156)] border-none gap-2 flex items-center border"
            >
              <img src="/images/icon-reply.svg" alt="" />
              Reply
            </button>
            {isCurrentUser && (
              <button
                className="text-red-500 md:px-4 py-1 rounded flex items-center gap-2"
                onClick={() => onDeleteComment(comment.id)}
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
              src={currentUser.image.png}
              alt={currentUser.username}
              className="w-10 h-10 rounded-full mr-2"
            />
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
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
              <Reply
                key={reply.id}
                reply={reply}
                currentUser={currentUser}
                onDelete={() => onDeleteReply(reply.id)}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                handleReplySubmit={handleReplySubmit}
                onEdit={(replyId, editedContent) =>
                  onEditReply(replyId, editedContent)
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Reply = ({
  reply,
  currentUser,
  onDelete,
  onEdit,
  replyContent,
  setReplyContent,
  handleReplySubmit,
}) => {
  const isCurrentUser = currentUser.username === reply.user.username;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);
  const [showReply, setShowReply] = useState(false);

  const handleEditSubmit = () => {
    if (editedContent) {
      onEdit(reply.id, editedContent);
      setIsEditing(false);
    }
  };

  const handleShowReply = () => {
    setShowReply(!showReply);
  };

  return (
    <section className="">
      <div className="mb-2 bg-white rounded-lg p-4">
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
              onClick={handleShowReply}
              className="flex items-center gap-2"
            >
              <img src="/images/icon-reply.svg" alt="" />
              Reply
            </button>
            {isCurrentUser && (
              <button
                className="text-red-500 rounded flex items-center gap-2"
                onClick={() => onDelete(reply.id)}
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
      {showReply && (
        <div className="mt-2 bg-white p-5 rounded-lg flex gap-4 justify-between">
          <img
            src={currentUser.image.png}
            alt={currentUser.username}
            className="w-10 h-10 rounded-full mr-2"
          />
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
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
      )}
    </section>
  );
};

const CommentForm = ({ onSubmit, comment }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      onSubmit(content);
      setContent("");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-5 rounded-lg bg-white flex justify-between gap-4"
    >
      <img
        src={comment.image.png}
        alt={comment.username}
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

export default function Home() {
  const [comments, setComments] = useState(data[0].comments);
  const [replyContent, setReplyContent] = useState("");

  const currentUser = data[0].currentUser;

  const handleReply = (parentId, content) => {
    const newReply = {
      id: Date.now(),
      content: content,
      createdAt: new Date().toLocaleTimeString(),
      score: 0,
      user: currentUser,
      replyingTo: parentId,
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  const handleDeleteReply = (replyId) => {
    const updatedComments = comments.map((comment) => ({
      ...comment,
      replies: comment.replies.filter((reply) => reply.id !== replyId),
    }));
    setComments(updatedComments);
  };

  const handleAddComment = (content) => {
    const newComment = {
      id: Date.now(),
      content: content,
      createdAt: new Date().toLocaleTimeString(),
      score: 0,
      user: currentUser,
      replies: [],
    };

    setComments([...comments, newComment]);
  };

  const handleEditReply = (replyId, content) => {
    const updatedComments = comments.map((comment) => ({
      ...comment,
      replies: comment.replies.map((reply) => {
        if (reply.id === replyId) {
          return {
            ...reply,
            content: content,
          };
        }
        return reply;
      }),
    }));
    setComments(updatedComments);
  };

  const handleEditComment = (commentId, editedContent) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content: editedContent,
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  return (
    <section className="bg-[rgb(245,246,250)]">
      <div className="container  mx-auto p-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onReply={handleReply}
            onDeleteComment={handleDeleteComment}
            onDeleteReply={handleDeleteReply}
            onEditComment={handleEditComment}
            onEditReply={handleEditReply}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
          />
        ))}
        <CommentForm comment={currentUser} onSubmit={handleAddComment} />
      </div>
    </section>
  );
}