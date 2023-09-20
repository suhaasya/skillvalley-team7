import React, { useState } from "react";

import ChatSection from "../components/ChatSection";
import ChatSidebar from "../components/ChatSidebar";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { auth } from "../firebase.config";
import { useGetAllChats, useGetUser } from "../hooks/useUserData";

export default function MessagesPage() {
  const userId = auth.currentUser?.uid;
  const [activeChatId, setActiveChatId] = useState(null);
  const { data: user, isLoading: userLoader } = useGetUser(userId);
  const { data: userChats, isLoading: chatsLoader } = useGetAllChats(userId);
  function handleActiveState(id) {
    setActiveChatId(id);
  }

  if (userLoader || chatsLoader) {
    return <Spinner />;
  }

  return (
    <Layout messages={true}>
      <section className="w-full flex h-[84vh] lg:h-full">
        <ChatSidebar
          onChatSelect={handleActiveState}
          activeChatId={activeChatId}
        />

        <ChatSection activeChatId={activeChatId} />
      </section>
    </Layout>
  );
}
