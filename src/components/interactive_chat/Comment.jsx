"use client";
import React, { useState, useEffect } from 'react';
import { useInteractiveChatContext } from '../provider/Context';

const Comment = () => {
  const {chatData} = useInteractiveChatContext();
  return (
    <div>Comment</div>
  )
}

export default Comment;