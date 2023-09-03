"use client";
import React, { useState, useEffect } from 'react';
import { useInteractiveChatContext } from '../provider/Context';

const CommentForm = () => {
  const {chatData} = useInteractiveChatContext();
  return (
    <div>CommentForm</div>
  )
}

export default CommentForm;