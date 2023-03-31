import React, { useState } from "react";
import { ChatBox } from "../components/chat-box";
import { Radio } from "../components/select-subject";
function Home() {
  const [currentRadioValue, setCurrentRadioValue] = useState("science");
  return (
    <div className="wrapper" id="mainWrapper">
      <section>
        <div style={{ textAlign: "center" }}>
          <h1>Your AI teacher</h1>
          <img width="250" style={{ margin: "0px auto" }} src="/kid1.png" />
          {/* <Radio
            setCurrentRadioValue={setCurrentRadioValue}
            currentRadioValue={currentRadioValue}
          /> */}

          <p style={{ fontWeight: "bold", color: "#3c8f4b" }}>VIA ChatGPT</p>
        </div>
      </section>
      <section>
        <ChatBox subject={""} />
      </section>
    </div>
  );
}

export default Home;
