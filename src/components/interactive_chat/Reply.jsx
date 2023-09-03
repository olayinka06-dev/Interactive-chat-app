"use client";
import React, { useState, useEffect } from 'react';
import { useInteractiveChatContext } from '../provider/Context';

const Reply = () => {
  const {chatData} = useInteractiveChatContext();
  return (
    <div>Reply</div>
  )
}

export default Reply;