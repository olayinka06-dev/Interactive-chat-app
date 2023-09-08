"use client";
import React, { useState, useRef } from "react";
import { BiMicrophone, BiMicrophoneOff, BiStop } from "react-icons/bi";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}><BiMicrophoneOff/></button>
      ) : (
        <button onClick={startRecording}><BiMicrophone/></button>
      )}
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
        </audio>
      )}
    </div>
  );
};

export default VoiceRecorder;
