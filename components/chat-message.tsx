export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
  image?: string;
};

export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Hello kid ! any questions?",
    image: "",
  },
];

export function ChatMessage({ who = "bot", message, image }: Message) {
  if (!message) {
    return null;
  }

  return (
    <div className={`prompt ${who != "bot" ? "right" : "left"}`}>
      <p className="name">{who != "bot" ? "You" : "Teacher"}</p>
      <div>
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
