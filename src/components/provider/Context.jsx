import { createContext, useContext } from "react";

export const InteractiveChatContext = createContext({
  chatData: {
    isCommentBySpecificUsers: () => {},
    handlePlayComment: () => {},
    handlePlayReply: () => {},
    handleCopyComment: () => {},
    handleCopyReply: () => {},
    handleReply: () => {},
  },
});

export const useInteractiveChatContext = () =>
  useContext(InteractiveChatContext);
