import { ChatBox } from "../components/chat-box";

function Home() {
  return (
    <div className="wrapper" id="mainWrapper">
      <section>
        <div style={{ textAlign: "center" }}>
          <h1>Your AI teacher</h1>
          <img width="250" style={{ margin: "0px auto" }} src="/kid1.png" />

          <p style={{ fontWeight: "bold", color: "#3c8f4b" }}>VIA ChatGPT</p>
        </div>
      </section>
      <section>
        <ChatBox />
      </section>
    </div>
  );
}

export default Home;
