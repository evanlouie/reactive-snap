import fs from "fs";
import marked from "marked";
import sass from "node-sass";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { promisify } from "util";
import { HighlightStyles } from "./components/HighlightStyles";
import { Post } from "./components/Post";
import { Styles } from "./components/Styles";
import { PostsContext } from "./contexts/PostsContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { IPage, IPost } from "./types";

const scss = fs.readFileSync(path.join(__dirname, "styles.scss"), { encoding: "utf8" });
const css = sass.renderSync({ data: scss }).css.toString();

const App: React.StatelessComponent<{ posts: IPost[]; pages: IPage[] }> = ({ posts, children }) => {
  return (
    <html>
      <head>
        <title>Evan Louie</title>
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Noto+Sans|Noto+Serif"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono|Roboto+Slab"
        />
        <script src="https://unpkg.com/turbolinks@latest/dist/turbolinks.js" />
      </head>
      <body style={{ fontFamily: `'Roboto', sans-serif` }}>
        <Styles css={css} />
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
      </body>
    </html>
  );
};

PostsContext.getPosts().then(posts => {
  const writeFile = promisify(fs.writeFile);
  for (const post of posts) {
    const { title, body, postDate } = post;
    const html = ReactDOMServer.renderToStaticMarkup(
      // const html = ReactDOMServer.renderToString(
      React.createElement(App, { posts, pages: [] }, React.createElement(Post, post)),
    );
    const writepath = path.join(__dirname, "..", "out", "posts", `${title}.html`);
    writeFile(writepath, html, { encoding: "utf8" }).then(() => console.log(`Out: ${writepath}`));
  }
});
