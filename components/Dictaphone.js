import React from "react";
import { useSpeechRecognition } from "react-speech-kit";

export function Dictaphone(props) {
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      console.log("result---->", result);
      props.setResult(props.result + " " + result);
    },
  });

  return (
    <div>
      {listening && <img style={{ width: "20px" }} src="/sound_200.gif" />}
      {/* <textarea
        value={props.result}
        onChange={(event) => props.setResult(event.target.value)}
      /> */}
      <button
        style={{
          padding: "8px",
          marginLeft: "5px",
        }}
        type="submit"
        onClick={listen}
      >
        <img width="40" src="/mic.png" />
      </button>
      {/* <button type="submit" onClick={stop}>
        OK
      </button> */}
    </div>
  );
}
