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
import { compressCSS, getCSS, minify, normalizeCSS, turbolinks } from "./server/File";
import { IPage, IPost } from "./types";

interface IAppState {
  posts: IPost[];
  pages: IPage[];
  title: string;
  styles: string[];
  scripts: string[];
}
const App: React.StatelessComponent<IAppState> = ({
  pages,
  posts,
  children,
  title,
  styles,
  scripts,
}) =>
  ((
    links: { styles: string[]; scripts: string[] } = {
      styles: [
        "https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono|Roboto+Slab",
        "https://fonts.googleapis.com/css?family=VT323",
        "https://cdn.rawgit.com/tonsky/FiraCode/1.205/distr/fira_code.css",
      ],
      scripts: [],
    },
  ) => (
    <html lang="en">
      <head>
        <title>{title ? title : "Evan Louie"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {links.styles.map((href) => <link key={href} rel="stylesheet" href={encodeURI(href)} />)}
        {styles.map((style) => <style key={style} dangerouslySetInnerHTML={{ __html: style }} />)}
        {scripts.map((script) => (
          <script key={script} dangerouslySetInnerHTML={{ __html: script }} />
        ))}
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
  ))();

const renderToStaticMarkup = async (
  content: IPage | IPost,
  pages: IPage[],
  posts: IPost[],
): Promise<string> =>
  Promise.all([
    Promise.all([turbolinks()]),
    Promise.all([normalizeCSS(), getCSS()]).then((styles) => Promise.all(styles.map(compressCSS))),
  ]).then(([scripts, styles]) =>
    ((title: string) =>
      "<!DOCTYPE html>" +
      ReactDOMServer.renderToStaticMarkup(
        !!content.filepath.match(/\.md$/i) ? (
          <App posts={posts} pages={pages} title={title} styles={styles} scripts={scripts}>
            <Post {...content as IPost} />
          </App>
        ) : !!content.filepath.match(/\.tsx?$/i) ? (
          <App posts={posts} pages={pages} title={title} styles={styles} scripts={scripts}>
            <div className="Page__content">{content.body}</div>
          </App>
        ) : (
          <App posts={posts} pages={pages} title={title} styles={styles} scripts={scripts}>
            <div className="Page__content">Page format not supported</div>
          </App>
        ),
      ))(content.title),
  );

const writeOutFile = async (
  filepath: string,
  page: IPage,
  pages: IPage[],
  posts: IPost[],
): Promise<string> =>
  Promise.all([filepath.match(/^(.+)\.(tsx?|md)$/i)])
    .then(
      ([validFile]) =>
        validFile
          ? Promise.resolve(
              path
                .join(__dirname, "..", "out", path.relative(__dirname, validFile[1]))
                .toLowerCase(),
            )
          : Promise.reject(new Error(`${filepath} does not match legal regex`)),
    )
    .then((writeOutDirectory) =>
      Promise.all([
        renderToStaticMarkup(page, pages, posts),
        path.join(writeOutDirectory, "index.html"),
        promisify(mkdirp)(writeOutDirectory),
      ]),
    )
    .then(([html, writePath, _]) =>
      promisify(fs.writeFile)(writePath, html, { encoding: "utf8" }).then(() => writePath),
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
(async (startTime = Date.now()) =>
  Promise.resolve()
    .then(() => console.info("Regenerating site..."))
    .then(() => getSiteFiles())
    .then((fileWrites) => Promise.all(fileWrites))
    .then((files) => console.table(files))
    .then(() => console.info(`Site regenerated in: ${Date.now() - startTime}ms`))
    .catch(console.error))();

// (async (startTime = Date.now()) => {
//   try {
//     console.clear();
//     console.info("Regenerating site...");
//     const writes = await getSiteFiles();
//     const filesWritten = await Promise.all(writes);
//     console.table(filesWritten);
//     console.info(`Site regenerated in: ${Date.now() - startTime}ms`);
//   } catch (err) {
//     console.error(err);
//   }
// })();
