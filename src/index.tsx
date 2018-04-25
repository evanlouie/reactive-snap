import fs from "fs";
import mkdirp from "mkdirp";
import sass from "node-sass";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { promisify } from "util";
import { Post } from "./components/Post";
import { Styles } from "./components/Styles";
import { PostsContext } from "./contexts/PostsContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { IPage, IPost } from "./types";

const scss = fs.readFileSync(path.join(__dirname, "styles.scss"), { encoding: "utf8" });
const css = sass.renderSync({ data: scss }).css.toString();

interface IAppState {
  posts: IPost[];
  pages: IPage[];
  title?: string;
}
const App: React.StatelessComponent<IAppState> = ({ posts, children, title }) => {
  return (
    <html>
      <head>
        <title>{title ? title : "Evan Louie"}</title>
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
      <body style={{ fontFamily: `'Noto Sans', sans-serif` }}>
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

const generatePosts = async () => {
  const writeFile = promisify(fs.writeFile);
  const mkdir = promisify(mkdirp);
  const posts = await PostsContext.getPosts();

  for (const post of posts) {
    const { title } = post;
    const cleanedTitle = title.match(/^(.+)\.(md|markdown)$/i);
    const html = ReactDOMServer.renderToStaticMarkup(
      <App title={cleanedTitle ? cleanedTitle[1] : title} posts={posts} pages={[]}>
        <Post {...post} />
      </App>,
    );
    const writeDirectory = path.join(__dirname, "..", "out", "posts", `${title}`);
    mkdir(writeDirectory).then(() => {
      const writepath = path.join(writeDirectory, "index.html");
      writeFile(writepath, html, { encoding: "utf8" }).then(() => console.log(`Out: ${writepath}`));
    });
  }
};

generatePosts();
