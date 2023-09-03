"use client";
import React, {useEffect, useState} from 'react';
import { InteractiveChatContext } from './Context';


export const AppWrapper = ({children}) => {
  return (
    <InteractiveChatContext.Provider value={""}>
      {children}
    </InteractiveChatContext.Provider>
  )
}

