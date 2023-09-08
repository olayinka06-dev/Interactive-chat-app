// import React, { useState } from "react";
// import { MdRecordVoiceOver } from "react-icons/md";

// const VoiceRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const audioChunks = [];

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const mediaRecorder = new MediaRecorder(stream);

//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         audioChunks.push(event.data);
//       }
//     };

//     mediaRecorder.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
//       setAudioBlob(audioBlob);
//       const url = URL.createObjectURL(audioBlob);
//       setAudioUrl(url);
//     };

//     mediaRecorder.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//     mediaRecorder.stop();
//   };

//   return (
//     <div>
//       {isRecording ? (
//         <button onClick={stopRecording}>Stop Recording</button>
//       ) : (
//         <button onClick={startRecording}><MdRecordVoiceOver/></button>
//       )}
//       {audioUrl && (
//         <div>
//           <audio controls>
//             <source src={audioUrl} type="audio/mp3" />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoiceRecorder;

"use client";

import React, { useState } from "react";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioChunks = [];
  let mediaRecorder;

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" }); // Updated type
      setAudioBlob(audioBlob);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {/* {audioUrl && ( */}
        <div>
          <audio controls>
            <source src={audioUrl} type="audio/wav" /> {/* Updated type */}
            Your browser does not support the audio element.
          </audio>
        </div>
      {/* )} */}
    </div>
  );
};

export default VoiceRecorder;
