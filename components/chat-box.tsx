import { useEffect, useState } from "react";
import { type Message, initialMessages, ChatMessage } from "./chat-message";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "next-openai-chatgpt";

const PreLoader = () => (
  <div className="prompt left">
    <p className="name">AI</p>
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="question">
    <input
      type="text"
      aria-label="chat input"
      required
      value={input}
      placeholder="Type a message to start the conversation"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <button
      type="submit"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      Ask
    </button>
  </div>
);

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const [infoImage, setInfoImage] = useState<String>("");

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  const createImage = async (query: string): Promise<String> => {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: "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",
      ln: "en",
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: query,
      n: 2,
      size: "256x256",
    });

    console.log("res===>", response.data.data[0].url);
    console.log("res===>", response);
    setInfoImage(response.data.data[0].url);
    return response.data.data[0].url;
  };

  const sendMessage = async (message: string) => {
    setLoading(true);

    //const res = searchGIF(message);

    const newMessages = [
      ...messages,
      { message: message, who: "user" } as Message,
    ];
    setMessages(newMessages);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages,
        user: cookie[COOKIE_NAME],
      }),
    });

    const data = await response.json();
    const imggg = await createImage(message);
    //console.log("infoImage===>", imggg);
    setMessages([
      ...newMessages,
      { message: data.text.trim(), who: "bot", image: imggg } as Message,
    ]);

    setLoading(false);
  };

  return (
    <div className="dialogue">
      {messages.map(({ message, who, image }, index) => (
        <ChatMessage key={index} who={who} message={message} image={image} />
      ))}

      {loading && <PreLoader />}

      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}
