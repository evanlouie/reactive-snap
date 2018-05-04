import fs from "fs";
import glob from "glob";
import { minify } from "html-minifier";
import { Seq } from "immutable";
import mkdirp from "mkdirp";
import sass from "node-sass";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { promisify } from "util";
import { Post } from "./components/Post";
import { PostsContext } from "./contexts/PostsContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { File } from "./server/File";
import { IPage, IPost } from "./types";

interface IAppState {
  posts: IPost[];
  pages: IPage[];
  title?: string;
}
const { css } = File;
const App: React.StatelessComponent<IAppState> = ({ posts, children, title }) => {
  const { turbolinks, normalizecss } = File;
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
        <style dangerouslySetInnerHTML={{ __html: normalizecss }} />
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script dangerouslySetInnerHTML={{ __html: turbolinks }} />
      </head>
      <body style={{ fontFamily: `'Roboto', 'Noto Sans', sans-serif` }}>
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

const convertFileToHTML = async (
  filepath: string,
  content: IPage | IPost,
  pages: IPage[],
  posts: IPost[],
): Promise<string> => {
  const contents = await promisify(fs.readFile)(filepath, { encoding: "utf8" });
  if (!!filepath.match(/\.md$/i)) {
    const page = (
      <App posts={posts} pages={pages} title={filepath}>
        <Post {...content as IPost} />
      </App>
    );
    return ReactDOMServer.renderToStaticMarkup(page);
  } else if (!!filepath.match(/\.tsx?$/i)) {
    const pageContent: IPage = {
      title: filepath,
      body: <div className="Page__content">{content.body}</div>,
    };
    const page = (
      <App posts={posts} pages={pages} title={filepath}>
        <div className="Page__content">{content.body}</div>
      </App>
    );
    return ReactDOMServer.renderToStaticMarkup(page);
  }
  return "Unsupported filetype";
};

const getSiteFiles = async (): Promise<string[]> => {
  const writeFile = promisify(fs.writeFile);
  const mkdir = promisify(mkdirp);
  const sitePath = path.join(__dirname);
  const files = await promisify(glob)(`${sitePath}/**/*.{tsx,md}`);

  /** Prep pages and posts to saturated contexts */
  const postsMapP: { [filepath: string]: Promise<IPost> } = Seq(files)
    .filter(filename => !!path.basename(filename).match(/\.md$/i))
    .reduce<{ [filepath: string]: Promise<IPost> }>((carry, filepath) => {
      carry[filepath] = PostsContext.convertFileToPost(filepath);
      return carry;
    }, {});

  const pagesMapP: { [filepath: string]: Promise<IPage> } = Seq(files)
    .filter(filename => !!path.basename(filename).match(/\.tsx?$/i))
    .reduce<{ [filepath: string]: Promise<IPage> }>((carry, filepath) => {
      const defaultExport = require(filepath).default;
      /** .tsx files with a default export are used as 'pages' */
      if (typeof defaultExport === "function") {
        carry[filepath] = Promise.resolve<IPage>({
          title: path.basename(filepath),
          body: <div className="Post">{defaultExport()}</div>,
        });
      }
      return carry;
    }, {});

  const pagesP = Promise.all(Object.values(pagesMapP));
  const postsP = Promise.all(Object.values(postsMapP));

  const writesP = Object.entries({ ...postsMapP, ...pagesMapP }).map(
    async ([filepath, pageP]): Promise<string> => {
      const [page, pages, posts] = await Promise.all([pageP, pagesP, postsP]);
      const htmlP = convertFileToHTML(filepath, page, pages, posts);
      const relativeToSrc = path.relative(__dirname, filepath);
      const filenameWithoutExt = filepath.match(/^(.+)\.(tsx?|md)$/i);
      if (filenameWithoutExt) {
        const outDir = path.join(__dirname, "..", "out", relativeToSrc);
        const createDirP = mkdir(outDir);
        return Promise.all([createDirP, htmlP]).then(async ([_, html]) => {
          const writePath = path.join(outDir, "index.html");

          await writeFile(
            writePath,
            minify(" <!DOCTYPE html>" + html, {
              collapseWhitespace: true,
              minifyCSS: true,
              minifyJS: true,
            }),
            {
              encoding: "utf8",
            },
          );
          return writePath;
        });
      }
      return Promise.reject(new Error(`${filepath} does not match legal regex`));
    },
  );

  return Promise.all(writesP);
};

console.log("Regerating site...");
getSiteFiles()
  .then(files => {
    console.info(`Site regenerated:`, files);
  })
  .catch((reason: Error) => {
    console.error(reason.message);
  });
