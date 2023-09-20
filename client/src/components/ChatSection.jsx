import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Message from "../components/Message";
import { auth, database, db } from "../firebase.config";
import ProfileCard from "./ProfileCard";
import { v4 as uuid } from "uuid";
import {
  useCreateMessage,
  useGetMessages,
  useGetUser,
} from "../hooks/useUserData";
import { serverTimestamp } from "firebase/firestore";

export default function ChatSection({ activeChatId }) {
  const userId = auth.currentUser?.uid;
  const [text, setText] = useState("");
  const { mutate, isLoading } = useCreateMessage({
    id1: userId,
    id2: activeChatId,
  });
  const { data: messages } = useGetMessages({
    userId,
    activeChatId,
  });

  const { data: user, isLoading: userLoader } = useGetUser(activeChatId);

  function handleChange(e) {
    setText(e.target.value);
  }

  function sendMessage() {
    const data = {
      text: text,
      senderId: userId,
      date: new Date().getTime() / 1000,
      id: uuid(),
    };

    mutate(data);
    setText("");
  }

  return (
    <div className="w-3/5 flex flex-col">
      <div className="border-solid border-b-2 border-b-light_gray">
        {userLoader ? (
          "loading..."
        ) : (
          <ProfileCard
            userName={`${user?.firstName} ${user?.lastName}`}
            userBio={user?.briefBio}
          />
        )}
      </div>
      <div className=" h-full overflow-y-auto">
        {messages?.map((msg) => (
          <Message key={msg?.id} type={msg?.senderId === userId && "owner"}>
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
          <Button
            type={"success"}
            size={"medium"}
            onClick={sendMessage}
            isLoading={isLoading}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
