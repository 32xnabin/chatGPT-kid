export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
  image?: string;
};

export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Hello kid ! I'm A friendly AI. Ask me anything!",
    image: "",
  },
];

export function ChatMessage({ who = "bot", message, image }: Message) {
  if (!message) {
    return null;
  }

  return (
    <div className={`prompt ${who != "bot" ? "right" : "left"}`}>
      <div>
        <p className="name">{who != "bot" ? "You" : "AI"}</p>
        <p className="msg">
          {message}
          {image !== "" && who == "bot" && (
            <img src={image} width="auto" height="300" alt="no image" />
          )}
        </p>
      </div>
    </div>
  );
}
