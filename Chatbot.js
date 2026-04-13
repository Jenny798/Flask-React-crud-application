import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // 🤖 RULE-BASED RESPONSE ENGINE
  const getBotReply = (input) => {
    const msg = input.toLowerCase().trim();

    // Greetings
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello! 👋 How can I help you today?";
    }

    // Job tracker related (since your project is job tracker)
    if (msg.includes("job")) {
      return "You can add, update, and track your jobs in the dashboard 📊";
    }

    // Motivation
    if (msg.includes("motivate") || msg.includes("motivation")) {
      return "Keep going 🚀 Success is built one step at a time!";
    }

    // Backend / API help
    if (msg.includes("api")) {
      return "Make sure your backend is running on http://127.0.0.1:5000 ⚙️";
    }

    // Help
    if (msg.includes("help")) {
      return "Try asking: 'job', 'motivate me', or 'hello' 😊";
    }

    // Default fallback
    return "Sorry, I didn't understand that 🤔 Try asking for help.";
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const botReply = getBotReply(message);

    setChat((prev) => [
      ...prev,
      { user: message, bot: botReply }
    ]);

    setMessage("");
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        className="btn btn-primary rounded-circle"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          fontSize: "20px"
        }}
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div
          className="card shadow"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px"
          }}
        >
          <div className="card-body">
            <h6>Chatbot </h6>

            {/* CHAT MESSAGES */}
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {chat.map((c, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <p><b>You:</b> {c.user}</p>
                  <p><b>Bot:</b> {c.bot}</p>
                  <hr />
                </div>
              ))}
            </div>

            {/* INPUT */}
            <input
              className="form-control mt-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            {/* BUTTON */}
            <button
              className="btn btn-success mt-2 w-100"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}