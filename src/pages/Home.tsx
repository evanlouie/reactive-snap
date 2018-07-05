import React, { StatelessComponent } from "react";
import { BlogContext } from "../contexts/BlogContext";
import { IPage, IPost } from "../types";

const Post: StatelessComponent<IPost> = ({ title, postDate, excerpt, url }) => (
  <article className="Post" key={title}>
    <h2>
      <a href={"/" + url}>{title}</a>
    </h2>
    <p>{excerpt}</p>
    <time dateTime={postDate.toISOString()}>{postDate.toDateString()}</time>
  </article>
);

const PostGrid: StatelessComponent<{ posts: IPost[] }> = ({ posts }) => (
  <div className="PostGrid">{posts.map(Post)}</div>
);

const Home: StatelessComponent<{ pages: IPage[]; posts: IPost[] }> = ({ posts }) => (
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
    <PostGrid posts={posts} />
  </div>
);

export default (() => (
  <BlogContext.Consumer>{(blog) => <Home {...blog} />}</BlogContext.Consumer>
)) as StatelessComponent;
