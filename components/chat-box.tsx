import { useEffect, useState } from "react";
import { type Message, initialMessages, ChatMessage } from "./chat-message";
import { useCookies } from "react-cookie";

import { apiKey } from "./config";
const COOKIE_NAME = "next-openai-chatgpt";

const PreLoader = () => (
  <div className="prompt left">
    <p className="name">Teacher</p>
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
      placeholder="like: what is photosynthesis?"
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
      OK
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
      apiKey: apiKey,
      ln: "en",
    });
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createImage({
        prompt:
          "Only if a school kid should know this:," +
          query +
          " , can you give a diagram? ",
        n: 2,
        size: "256x256",
      });
      console.log("res===>", response.data.data[0].url);
      console.log("res===>", response);
      setInfoImage(response.data.data[0].url);
      return response.data.data[0].url;
    } catch {
      return "https://cdn.pixabay.com/photo/2022/04/10/17/28/stop-sign-7123858_960_720.png";
    }
  };

  const sendMessage = async (message: string) => {
    setLoading(true);

    //const res = searchGIF(message);

    const newMessages = [
      ...messages,
      {
        message: "Answer only if a school kid should know this : " + message,
        who: "user",
      } as Message,
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
    console.log("response===>", response);

    const data = await response.json();
    //JSON.parse(data.trim());
    const imggg = await createImage(message);
    console.log("infoImage===>", imggg);
    setMessages([
      ...newMessages,
      {
        message: data.text.trim(),
        who: "bot",
        image: imggg,
      } as Message,
    ]);

    setLoading(false);
  };

  return (
    <div>
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
