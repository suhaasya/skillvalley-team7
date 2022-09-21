import React from "react";
import { useContext } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { GlobalContext } from "../context/GlobalState";

export default function MessagesPage() {
  const { loading } = useContext(GlobalContext);

  if (loading) {
    return <Spinner />;
  }

  return <Layout messages={true}>Will be available soon</Layout>;
}
