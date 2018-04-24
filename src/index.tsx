import * as fs from "fs";
import * as marked from "marked";
import * as path from "path";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { promisify } from "util";
import { Post } from "./components/Post";
import { PostsContext } from "./contexts/PostsContext";
import { IPost } from "./types";

const App: React.StatelessComponent<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <div className="App">
      <PostsContext posts={posts}>
        <PostsContext.Consumer>
          {state => (
            <div>
              {state.posts.map(({ title, body, postDate }) => (
                <Post key={title} title={title} body={body} postDate={postDate} />
              ))}
            </div>
          )}
        </PostsContext.Consumer>
      </PostsContext>
    </div>
  );
};

PostsContext.getPosts().then(posts => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(App, { posts }));
  console.log(html);
});
