import React, { StatelessComponent } from "react";
import { PostsContext } from "../contexts/PostsContext";
import { IPost } from "../types";

const Post: StatelessComponent<IPost> = ({ title, postDate }) => (
  <article key={title}>
    <h2>{title}</h2>
    <time dateTime={postDate.toISOString()}>{postDate.toDateString()}</time>
  </article>
);

const PostGrid: StatelessComponent<{ posts: IPost[] }> = ({ posts }) => (
  <div
    className="PostGrid"
    style={{
      display: "grid",
      gridTemplate: "auto / repeat(auto-fill, minmax(20em, 1fr))",
      gap: "1em",
    }}
  >
    {posts.map(Post)}
  </div>
);

const Home: StatelessComponent = () => (
  <div className="Home">
    <header>
      <h1>Evan Louie</h1>
      <details>
        <summary>Learn more...</summary>
        <p>
          The personal website of Evan Louie; developer, designer, photographer, fashionista, and
          drinker of <mark>beer</mark>.
        </p>
      </details>
    </header>
    <PostsContext.Consumer>{({ posts }) => <PostGrid posts={posts} />}</PostsContext.Consumer>
  </div>
);

export default Home;
