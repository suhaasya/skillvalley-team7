import React from "react";

import ChatSection from "../components/ChatSection";
import ChatSidebar from "../components/ChatSidebar";
import Layout from "../components/Layout";

export default function MessagesPage() {
  return (
    <Layout messages={true}>
      <section className="w-full flex h-[84vh] lg:h-full">
        <ChatSidebar />

        <ChatSection />
      </section>
    </Layout>
  );
}
