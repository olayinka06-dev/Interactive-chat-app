"use client";
import React, { useState } from "react";
import { data } from "../data";

const Comment = ({newMsg}) => {
  return(
    <div className="">
        {
            newMsg.map((nw, i)=> (
                <div key={i} className="">
                    <p>{nw.content}</p>
                </div>
            ))
        }
    </div>
  );
};

const CommentForm = ({ onSubmit }) => {
  const [inputMessage, setInputMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage) {
      onSubmit(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="inline-flex border py-2 px-6 focus:outline-none rounded text-lg"
          name=""
          id=""
          cols="30"
          rows="2"
        ></textarea>
        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default function Home() {
  const [newMessage, setNewMessage] = useState(data[0].comments);

  const handleNewMwssage = (newMsg) => {
    const newComment = {
      id: Date.now(),
      content: newMsg,
      createdAt: new Date().toDateString(),
      score: 0,
    //   user: currentUser,
      replies: [],
    };
    setNewMessage([...newMessage, newComment])
  };

  return (
    <div className="">
        <Comment newMsg={newMessage}/>
      <CommentForm onSubmit={handleNewMwssage} />
    </div>
  );
}
