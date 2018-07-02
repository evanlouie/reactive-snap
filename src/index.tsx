import fs from "fs";
import glob from "glob";
import mkdirp from "mkdirp";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { promisify } from "util";
import { Post } from "./components/Post";
import { convertFileToPost, PostsContext } from "./contexts/PostsContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { File, getCSS, minify } from "./server/File";
import { IPage, IPost } from "./types";

interface IAppState {
  posts: IPost[];
  pages: IPage[];
  title: string;
  css: string;
}
const App: React.StatelessComponent<IAppState> = ({ pages, posts, children, title, css }) => (
  <html lang="en">
    <head>
      <title>{title ? title : "Evan Louie"}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href={encodeURI("https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono|Roboto+Slab")}
      />
      <link rel="stylesheet" href={encodeURI("https://fonts.googleapis.com/css?family=VT323")} />
      <link
        rel="stylesheet"
        href={encodeURI("https://cdn.rawgit.com/tonsky/FiraCode/1.205/distr/fira_code.css")}
      />
      <style dangerouslySetInnerHTML={{ __html: File.normalizecss }} />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script dangerouslySetInnerHTML={{ __html: File.turbolinks }} />
    </head>
    <body>
      <PostsContext posts={posts}>
        <PostsContext.Consumer>
          {(postsState) => (
            <div className="PostsConsumer">
              <DefaultLayout pages={pages} posts={postsState.posts}>
                {children}
              </DefaultLayout>
            </div>
          )}
        </PostsContext.Consumer>
      </PostsContext>
    </body>
  </html>
);

const renderToStaticMarkup = async (
  filepath: string,
  content: IPage | IPost,
  pages: IPage[],
  posts: IPost[],
): Promise<string> =>
  getCSS().then((css) =>
    ReactDOMServer.renderToStaticMarkup(
      !!filepath.match(/\.md$/i) ? (
        <App posts={posts} pages={pages} title={(content as IPost).title} css={css}>
          <Post {...content as IPost} />
        </App>
      ) : !!filepath.match(/\.tsx?$/i) ? (
        <App posts={posts} pages={pages} title={filepath} css={css}>
          <div className="Page__content">{content.body}</div>
        </App>
      ) : (
        <App posts={posts} pages={pages} title={filepath} css={css}>
          <div className="Page__content">Page format not supported</div>
        </App>
      ),
    ),
  );

const writeOutFile = async (
  filepath: string,
  page: IPage,
  pages: IPage[],
  posts: IPost[],
): Promise<string> =>
  ((validFile = filepath.match(/^(.+)\.(tsx?|md)$/i)) =>
    validFile
      ? ((
          outDir = path
            .join(__dirname, "..", "out", path.relative(__dirname, validFile[1]))
            .toLowerCase(),
        ) =>
          Promise.all([
            renderToStaticMarkup(filepath, page, pages, posts),
            promisify(mkdirp)(outDir),
          ]).then(([html, _], writePath: string = path.join(outDir, "index.html")) =>
            promisify(fs.writeFile)(writePath, html, { encoding: "utf8" }).then(() => writePath),
          ))()
      : Promise.reject(new Error(`${filepath} does not match legal regex`)))();

const generateSite = async <T extends {}>(
  sitePath: string = path.join(__dirname),
  siteFiles = promisify(glob)(`${sitePath}/**/*.{tsx,md}`),
  fileConverters = [
    [
      /\.md$/i,
      (carry: T[], filepath: string) => ({ ...carry, [filepath]: convertFileToPost(filepath) }),
    ],
    [
      /\.tsx?$/i,
      (carry: T[], filepath: string) =>
        ((DefaultExport = require(filepath).default) =>
          typeof DefaultExport === "function"
            ? {
                ...carry,
                [filepath]: Promise.resolve<IPage>({
                  title: path.basename(filepath),
                  body: (
                    <div className="Post">
                      <DefaultExport />
                    </div>
                  ),
                  tags: [],
                  filepath,
                }),
              }
            : carry)(),
    ],
  ],
) =>
  siteFiles.then((files) =>
    files.reduce<{ [filepath: string]: Promise<string> }>(
      (site, filepath) => ({ ...site, [filepath]: Promise.resolve(filepath) }),
      {},
    ),
  );

const getSiteFiles = async (
  sitePath: string = path.join(__dirname),
  siteFiles: Promise<string[]> = promisify(glob)(`${sitePath}/**/*.{tsx,md}`),
): Promise<Array<Promise<string>>> =>
  Promise.all([
    siteFiles.then((files) =>
      files
        .filter((filename) => !!path.basename(filename).match(/\.md$/i))
        .reduce<{ [filepath: string]: Promise<IPost> }>(
          (carry, filepath) => ({ ...carry, [filepath]: convertFileToPost(filepath) }),
          {},
        ),
    ),
    siteFiles.then((files) =>
      files
        .filter((filename) => !!path.basename(filename).match(/\.tsx?$/i))
        .reduce<{ [filepath: string]: Promise<IPage> }>(
          (carry, filepath) =>
            ((DefaultExport = require(filepath).default) =>
              typeof DefaultExport === "function"
                ? {
                    ...carry,
                    [filepath]: Promise.resolve<IPage>({
                      title: path.basename(filepath),
                      body: (
                        <div className="Post">
                          <DefaultExport />
                        </div>
                      ),
                      tags: [],
                      filepath,
                    }),
                  }
                : carry)(),
          {},
        ),
    ),
  ]).then(([postsMap, pagesMap]) =>
    Object.entries({ ...postsMap, ...pagesMap }).map(([filepath, pageGenerating]) =>
      Promise.all([
        pageGenerating,
        Promise.all(Object.values(pagesMap)),
        Promise.all(Object.values(postsMap)),
      ]).then(([page, pages, posts]) => writeOutFile(filepath, page, pages, posts)),
    ),
  );

////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////
(async (startTime = Date.now()) => {
  try {
    console.info("Regerating site...");
    const writes = await getSiteFiles();
    const filesWritten = await Promise.all(writes);
    console.table(filesWritten);
    console.info(`Site regenerated in: ${Date.now() - startTime}ms`);
  } catch (err) {
    console.error(err);
  }
})();
