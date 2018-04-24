import fs from "fs";
import marked from "marked";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { promisify } from "util";
import { Post } from "./components/Post";
import { PostsContext } from "./contexts/PostsContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { IPage, IPost } from "./types";

const App: React.StatelessComponent<{ posts: IPost[]; pages: IPage[] }> = ({ posts, children }) => {
  return (
    <div className="App">
      <PostsContext posts={posts}>
        <PostsContext.Consumer>
          {postsState => (
            <div className="PostsConsumer">
              <DefaultLayout pages={[]} posts={postsState.posts}>
                {children}
              </DefaultLayout>
            </div>
          )}
        </PostsContext.Consumer>
      </PostsContext>
    </div>
  );
};

PostsContext.getPosts().then(posts => {
  const writeFile = promisify(fs.writeFile);
  for (const post of posts) {
    const { title, body, postDate } = post;
    const html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(App, { posts, pages: [] }, React.createElement(Post, post)),
    );
    const writepath = path.join(__dirname, "..", "out", "posts", `${title}.html`);
    writeFile(writepath, html, { encoding: "utf8" }).then(() => console.log(`Out: ${writepath}`));
  }
});
