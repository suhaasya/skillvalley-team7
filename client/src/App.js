import Layout from "./components/Layout";
import PostCard from "./components/PostCard/PostCard";

function App() {
  return (
    <div className="App">
      <Layout home={true}>
        <ul className="md:px-24 py-2">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />

          <li className="mb-4 text-xs pb-4 text-center">
            That’s it so far. Hope you got some work inspiration from your
            network! :)
          </li>
        </ul>
      </Layout>
    </div>
  );
}

export default App;
