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
    updatedComments: {},
    comments: {},
    replyContent: "",
    currentUser: {
      image: {
        png: "",
        webp: ""
      },
      username: "",
    },
  },
});

export const useInteractiveChatContext = () =>
  useContext(InteractiveChatContext);
