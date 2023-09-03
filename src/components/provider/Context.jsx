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
  },
});

export const useInteractiveChatContext = () =>
  useContext(InteractiveChatContext);
