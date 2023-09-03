"use client";
import React, {useEffect, useState} from 'react';
import { InteractiveChatContext } from './Context';
import { data } from '../data';


export const AppWrapper = ({children}) => {
  
  const [comments, setComments] = useState(data[0].comments);
  const [replyContent, setReplyContent] = useState("");
  
  const currentUser = data[0].currentUser;
  

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      // If no comments are found in local storage, set initial comments from data
      setComments(data[0].comments);
    }
  }, []);

  // Save comments to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const isCommentBySpecificUsers = (comment) =>
    ["amyrobson", "maxblagun", "ramsesmiron"].includes(comment.user.username);

  const handlePlayComment = (commentContent) => {
    const utterance = new SpeechSynthesisUtterance(commentContent);
    speechSynthesis.speak(utterance);
  };
  const handlePlayReply = (commentContent) => {
    const utterance = new SpeechSynthesisUtterance(commentContent);
    speechSynthesis.speak(utterance);
  };

  const handleCopyComment = (commentContent) => {
    navigator.clipboard.writeText(commentContent).then(() => {
      console.log("Content copied to clipboard");
    });
  };
  const handleCopyReply = (commentContent) => {
    navigator.clipboard.writeText(commentContent).then(() => {
      console.log("Content copied to clipboard");
    });
  };

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

  const chatData = {
    isCommentBySpecificUsers,
    handlePlayComment,
    handlePlayReply,
    handleCopyComment,
    handleCopyReply,
    handleReply,
    handleDeleteComment,
    handleDeleteReply,
    handleAddComment,
    handleEditReply,
    handleEditComment,
    setComments,
    setReplyContent,
    comments,
    replyContent,
    currentUser,
  }

  return (
    <InteractiveChatContext.Provider value={{ chatData }}>
      {children}
    </InteractiveChatContext.Provider>
  )
}

