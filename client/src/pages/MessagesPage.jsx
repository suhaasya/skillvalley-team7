import React from "react";
import { useSelector } from "react-redux";
import ChatSection from "../components/ChatSection";
import ChatSidebar from "../components/ChatSidebar";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";

export default function MessagesPage() {
  const { user, loading } = useSelector((state) => state.user);

  if (loading || !user.firstName) {
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
