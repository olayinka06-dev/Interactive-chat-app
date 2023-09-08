import { createContext, useContext } from "react";

export const InteractiveChatContext = createContext({
  chatData: {
    isCommentBySpecificUsers: () => {},
    handlePlayComment: () => {},
    handlePlayReply: () => {},
    handleCopyComment: () => {},
    handleCopyReply: () => {},
    handleReply: () => {},
    handleDeleteComment: () => {},
    handleDeleteReply: () => {},
    handleAddComment: () => {},
    handleEditReply: () => {},
    handleEditComment: () => {},
    setComments: () => {},
    setReplyContent: () => {},
    startRecording: () => {},
    stopRecording: () => {},
    setIsRecording: () => {},
    setAudioUrl: () => {},
    isRecording: false,
    audioUrl: null,
    comments: [
      {
        id: "",
        content: "",
        createdAt: "",
        score: "",
        user: {
          image: {
            png: "",
            webp: "",
          },
          username: "",
        },
        replies: [],
      },
    ],
    replyContent: null,
    currentUser: {
      image: {
        png: "",
        webp: "",
      },
      username: "",
    },
  },
});

export const useInteractiveChatContext = () =>
  useContext(InteractiveChatContext);
