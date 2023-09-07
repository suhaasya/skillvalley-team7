import React from "react";
import Button from "../components/Button";
import Message from "../components/Message";
import { db } from "../firebase.config";
import ProfileCard from "./ProfileCard";
import { v4 as uuid } from "uuid";

export default function ChatSection() {
  return (
    <div className="w-3/5 flex flex-col">
      {/* <div className="border-solid border-b-2 border-b-light_gray">
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
      </div> */}
    </div>
  );
}
