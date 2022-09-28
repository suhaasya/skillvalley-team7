import React from "react";
import { useContext } from "react";
import ChatSection from "../components/ChatSection";
import ChatSidebar from "../components/ChatSidebar";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { GlobalContext } from "../context/GlobalState";

export default function MessagesPage() {
  const { loading } = useContext(GlobalContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout messages={true}>
      <section className="w-full flex h-[84vh] lg:h-full">
        <ChatSidebar />

        <ChatSection />
      </section>
    </Layout>
  );
}
