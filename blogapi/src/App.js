import React, { useEffect, useState } from "react";
import "./App.css";
import axiosInstance from "./axios";
import Posts from "./components/Posts";
import PostLoadingComponent from "./components/PostLoading";

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    axiosInstance.get("/post").then((res) => {
      const allPosts = res.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    });
  }, [setAppState]);
  return (
    <div className="App">
      <h1>Naujausi skelbimai</h1>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </div>
  );
}

export default App;
// class connectionExample extends React.Component {
//   componentDidMount() {
//     const apiUrl = "http://127.0.0.1:8000/api/";
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }
//   render() {
//     return <div>Example connection</div>;
//   }
// }

// export default connectionExample;
