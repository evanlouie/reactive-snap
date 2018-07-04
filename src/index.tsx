import fs from "fs-extra";
import glob from "glob";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { promisify } from "util";
import { Post } from "./components/Post";
import { convertFileToPost, PostsContext } from "./contexts/PostsContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { compressCSS, compressJS, getCSS, normalizeCSS, turbolinks } from "./server/File";
import { IPage, IPost } from "./types";

interface IAppState {
  links: { styles: string[]; scripts: string[] };
  pages: IPage[];
  posts: IPost[];
  scripts: string[];
  styles: string[];
  title: string;
  description?: string;
}
const App: React.StatelessComponent<IAppState> = ({
  children,
  links,
  pages,
  posts,
  scripts,
  styles,
  title,
  description,
}) => (
  <html lang="en">
    <head>
      <title>{title ? title : "Evan Louie"}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="Description" content={description || "Evan Louie Website & Blog"} />
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
);

const renderToStaticMarkup = async (
  content: IPage | IPost,
  pages: IPage[],
  posts: IPost[],
): Promise<string> => {
  const [scripts, styles, links] = await Promise.all([
    Promise.all([turbolinks()]).then((uncompressed) => Promise.all(uncompressed.map(compressJS))),
    Promise.all([normalizeCSS(), getCSS()]).then((uncompressed) =>
      Promise.all(uncompressed.map(compressCSS)),
    ),
    {
      styles: [
        "https://fonts.googleapis.com/css?family=Roboto|Raleway|VT323",
        "https://cdn.rawgit.com/tonsky/FiraCode/1.205/distr/fira_code.css",
      ],
      scripts: [],
    },
  ]);
  return (
    "<!DOCTYPE html>" +
    ReactDOMServer.renderToStaticMarkup(
      <App
        posts={posts}
        pages={pages}
        title={content.title}
        styles={styles}
        scripts={scripts}
        links={links}
      >
        {content.filepath.match(/\.md$/i) ? (
          <Post {...content as IPost} />
        ) : content.filepath.match(/\.tsx?$/i) ? (
          <div className="Body__content">{content.body}</div>
        ) : (
          <div className="Body__content">Page format not supported</div>
        )}
      </App>,
    )
  );
};

const writeOutFile = async (
  filepath: string,
  page: IPage,
  pages: IPage[],
  posts: IPost[],
): Promise<string> => {
  const validFile = filepath.match(/^(.+)\.(tsx?|md)$/i);
  const writeOutDirectory = await (validFile
    ? path.join(__dirname, "..", "out", path.relative(__dirname, validFile[1])).toLowerCase()
    : Promise.reject(new Error(`${filepath} does not match legal regex`)));
  const [html, writePath, _] = await Promise.all([
    renderToStaticMarkup(
      page,
      pages,
      posts.sort((a, b) => b.postDate.getTime() - a.postDate.getTime()),
    ),
    path.join(writeOutDirectory, "index.html"),
    fs.ensureDir(writeOutDirectory),
  ]);
  await fs.writeFile(writePath, html, { encoding: "utf8" });
  return writePath;
};

const getSiteFiles = async (
  sitePath: string = path.join(__dirname),
): Promise<Array<Promise<string>>> => {
  const files = await promisify(glob)(`${sitePath}/**/*.{tsx,md}`);
  const postsMap: { [filepath: string]: Promise<IPost> } = files
    .filter((filename) => !!path.basename(filename).match(/\.md$/i))
    .reduce((carry, filepath) => ({ ...carry, [filepath]: convertFileToPost(filepath) }), {});
  const pagesMap: { [filepath: string]: Promise<IPage> } = files
    .filter((filename) => !!path.basename(filename).match(/\.tsx?$/i))
    .reduce((carry, filepath) => {
      const DefaultExport = require(filepath).default;
      const basename = path.basename(filepath);
      const titleMatch = basename.match(/^(.+)\.tsx?$/i);
      const title = titleMatch
        ? titleMatch[1]
            .split(/(?=[A-Z])/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : basename;
      return typeof DefaultExport === "function"
        ? {
            ...carry,
            [filepath]: Promise.resolve<IPage>({
              title,
              body: (
                <div className="Page">
                  <DefaultExport />
                </div>
              ),
              tags: [],
              filepath,
            }),
          }
        : carry;
    }, {});
  const [pages, posts]: [IPage[], IPost[]] = await Promise.all([
    Promise.all([...Object.values(pagesMap)]),
    Promise.all([...Object.values(postsMap)]),
  ]);
  return Object.entries({ ...pagesMap, ...postsMap }).map(async ([filepath, content]) =>
    writeOutFile(filepath, await content, pages, posts),
  );
};

////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////
(async () => {
  await fs.remove(path.join(__dirname, "..", "out"));
  const startTime = Date.now();
  console.info("Regenerating Site...");
  const fileWrites = await getSiteFiles();
  const files = await Promise.all(
    fileWrites.map((write) =>
      write.then((filepath) => {
        console.info(filepath, Date.now() - startTime);
        return filepath;
      }),
    ),
  );
  console.table(files);
  console.info(`Site regenerated in: ${Date.now() - startTime}ms`);
})().catch(console.error);
