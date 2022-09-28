import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Button from "../components/Button";
import Message from "../components/Message";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase.config";
import ProfileCard from "./ProfileCard";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";

export default function ChatSection() {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  function handleChange(e) {
    setText(e.target.value);
  }

  async function sendMessage() {
    console.log(text);
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    setText("");
  }

  return (
    <div className="w-3/5 flex flex-col">
      <div className="border-solid border-b-2 border-b-light_gray">
        {data && (
          <ProfileCard
            userName={`${data?.user.firstName} ${data?.user.lastName}`}
            userBio=""
          />
        )}
      </div>
      <div className=" h-full overflow-y-auto">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            type={msg.senderId === currentUser.uid && "owner"}
          >
            {msg.text}
          </Message>
        ))}
      </div>
      <div className="flex mt-auto items-center p-1 gap-1 border-solid border-t-2 border-light_gray">
        <div className="flex-1 ">
          <input
            type="text"
            className="w-full"
            placeholder="Start a new Message"
            onChange={handleChange}
            value={text}
          />
        </div>

        <div className="ml-auto">
          <Button type={"success"} size={"medium"} onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
