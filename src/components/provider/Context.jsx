import { createContext, useContext } from "react";

export const InteractiveChatContext = createContext({
   allData: {

   } 
});

export const useInteractiveChatContext = ()=>(
    useContext(InteractiveChatContext)
)