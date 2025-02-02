import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const messageStyles = {
  info: "bg-blue-900 text-white",
  warning: "bg-yellow-600 text-black",
  error: "bg-red-800 text-white",
};

const Message = ({ id, type, text, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 2, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      className={`standard-font relative p-2 rounded-lg shadow-md flex items-center ${messageStyles[type]}`}
    >
      <span className="flex-1">{text}</span>
      <button className="ml-2" onClick={() => onClose(id)}>
        <X size={18} />
      </button>
    </motion.div>
  );
};

const MessageContainer = ({ messages, duration = 2000 }) => {
  const [activeMessages, setActiveMessages] = useState(messages);

  useEffect(() => {
    if (messages.length > 0) {
      setActiveMessages((prev) => [...prev, ...messages]);
    }
  }, [messages]);

  useEffect(() => {
    const timers = activeMessages.map((msg) =>
      setTimeout(() => removeMessage(msg.id), duration)
    );

    return () => timers.forEach(clearTimeout);
  }, [activeMessages, duration]);

  const removeMessage = (id) => {
    setActiveMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <div className="fixed top-15 right-3 space-y-3 max-w-xs w-full">
      <AnimatePresence>
        {activeMessages.map((msg) => (
          <Message key={msg.id} {...msg} onClose={removeMessage} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageContainer;