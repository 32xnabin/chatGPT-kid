import { ChatBox } from "../components/chat-box";

function Home() {
  return (
    <div className="wrapper">
      <section>
        <h1>hey ! ask a AI anything </h1>
        <p style={{ fontWeight: "bold" }}>like: 'what is a solar system?'</p>
        <p style={{ color: "#3c8f4b" }}>
          AI will reply you with definition and image
        </p>
      </section>
      <section>
        <ChatBox />
      </section>
    </div>
  );
}

export default Home;
