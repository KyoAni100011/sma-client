import React from "react";
import PostList from "../feature/PostList";
import Navbar from "./header";

export default function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <PostList />
    </React.Fragment>
  );
}
