import React, { useEffect, useState } from "react";
import "../../App.css";
import axiosInstance from "../../axios";
import Posts from "./posts";
import PostLoadingComponent from "../PostLoading";

function Admin() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    axiosInstance.get("/admin/" + localStorage.getItem("id")).then((res) => {
      const allPosts = res.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    });
  }, [setAppState]);
  return (
    <div className="App">
      <h1>Visi skelbimai</h1>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </div>
  );
}
export default Admin;
