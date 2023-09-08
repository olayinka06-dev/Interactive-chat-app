"use client";
import React, { useEffect, useRef, useState } from "react";
import { InteractiveChatContext } from "./Context";
import { data } from "../data";

export const AppWrapper = ({ children }) => {
  const [comments, setComments] = useState(data[0].comments);
  const [replyContent, setReplyContent] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

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
    setIsCopy(true);

    setTimeout(() => {
      setIsCopy(false);
    }, 2000);

    navigator.clipboard.writeText(commentContent);
    // .then(() => {
    //   console.log("Content copied to clipboard");
    // });
  };
  const handleCopyReply = (commentContent) => {
    navigator.clipboard.writeText(commentContent);
    // .then(() => {
    //   console.log("Content copied to clipboard");
    // });
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
      audio: audioUrl&&audioUrl,
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

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
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
    setIsCopy,
    setIsPlay,
    startRecording,
    stopRecording,
    setIsRecording,
    setAudioUrl,
    isRecording,
    audioUrl,
    comments,
    replyContent,
    currentUser,
    isCopy,
    isPlay,
  };

  return (
    <InteractiveChatContext.Provider value={{ chatData }}>
      {children}
    </InteractiveChatContext.Provider>
  );
};

// {audioUrl && (
//   <audio controls>
//     <source src={audioUrl} type="audio/mp3" />
//   </audio>
// )}
