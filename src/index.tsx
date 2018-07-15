import fs from "fs-extra";
import glob from "glob";
import path from "path";
import React, { createFactory, StatelessComponent } from "react";
import ReactDOMServer from "react-dom/server";
import { promisify } from "util";
import { Page } from "./components/Page";
import { Post } from "./components/Post";
import { BlogContext } from "./contexts/BlogContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { compressCSS, compressJS, normalizeCSS, siteStyles, turbolinks } from "./server/File";
import { convertFileToPage } from "./server/Page";
import { convertFileToPost } from "./server/Post";
import { IPage, IPost } from "./types";

interface IScript
  extends React.DetailedHTMLProps<
      React.ScriptHTMLAttributes<HTMLScriptElement>,
      HTMLScriptElement
    > {
  script: string;
}
interface IStyle
  extends React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement> {
  css: string;
}

interface IAppState {
  links: { styles: string[]; scripts: string[] };
  meta: Array<React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>>;
  pages: IPage[];
  posts: IPost[];
  scripts: IScript[];
  styles: IStyle[];
  title: string;
}
const App: React.StatelessComponent<IAppState> = ({
  children,
  links,
  meta,
  pages,
  posts,
  scripts,
  styles,
  title,
}) => {
  const Meta: StatelessComponent<
    React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>
  > = (props) => (
    <meta
      key={Object.entries(props)
        .map(([key, value]) => key + value)
        .join("")}
      {...props}
    />
  );
  const Script: StatelessComponent<IScript> = ({ script, ...props }) => (
    <script key={script} dangerouslySetInnerHTML={{ __html: script }} {...props} />
  );
  const Style: StatelessComponent<IStyle> = ({ css, ...props }) => (
    <style key={css} dangerouslySetInnerHTML={{ __html: css }} {...props} />
  );

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        {meta.map(Meta)}
        {links.styles.map((href) => <link key={href} rel="stylesheet" href={encodeURI(href)} />)}
        {styles.map(Style)}
        {scripts.map(Script)}
      </head>
      <body>
        <BlogContext pages={pages} posts={posts}>
          <BlogContext.Consumer>
            {(blog) => (
              <DefaultLayout pages={blog.pages} posts={blog.posts}>
                {children}
              </DefaultLayout>
            )}
          </BlogContext.Consumer>
        </BlogContext>
      </body>
    </html>
  );
};

const renderToStaticMarkup = async (
  content: IPage | IPost,
  pages: IPage[],
  posts: IPost[],
): Promise<string> => {
  const [scripts, styles]: [IScript[], IStyle[]] = await Promise.all([
    Promise.all([turbolinks()])
      .then((uncompressed) => Promise.all(uncompressed.map(compressJS)))
      .then((compressed) => compressed.map((script) => ({ script }))),
    Promise.all([normalizeCSS(), siteStyles()])
      .then((uncompressed) => Promise.all(uncompressed.map(compressCSS)))
      .then((compressed) => compressed.map((css) => ({ css }))),
  ]);

  const appState: IAppState = {
    posts,
    pages,
    title: content.title,
    styles,
    scripts,
    links: {
      styles: [
        "https://fonts.googleapis.com/css?family=Roboto|Raleway|VT323",
        "https://cdn.rawgit.com/tonsky/FiraCode/1.205/distr/fira_code.css",
      ],
      scripts: [],
    },
    meta: [
      { charSet: "utf8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "Descriptions", content: "Evan Louie Website & Blog" },
    ],
  };

  return (
    "<!DOCTYPE html>" +
    ReactDOMServer.renderToStaticMarkup(
      <App {...appState}>
        {content.filepath.match(/\.md$/i) ? (
          <Post {...content as IPost} />
        ) : content.filepath.match(/\.tsx?$/i) ? (
          <Page {...content} />
        ) : (
          <div className="error">Page format not supported</div>
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
  outDir: string,
): Promise<string> => {
  const validFile = filepath.match(/^(.+)\.(tsx?|md)$/i);
  const writeOutDirectory = await (validFile
    ? path.join(outDir, page.url).toLowerCase()
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

const getSiteFiles = async (siteDir: string, outDir: string) => {
  const files = await promisify(glob)(`${siteDir}/**/*.{tsx,md}`);
  const postsReducer = (carry: { [filepath: string]: Promise<IPost> }, filepath: string) => ({
    ...carry,
    [filepath]: convertFileToPost(filepath),
  });
  const pagesReducer = (carry: { [filepath: string]: Promise<IPage> }, filepath: string) =>
    typeof require(filepath).default === "function"
      ? { ...carry, [filepath]: convertFileToPage(filepath) }
      : carry;
  const validPostFilepath = (filepath: string) =>
    !!path.basename(filepath).match(/\.(md|markdown)$/i);
  const validPageFilepath = (filepath: string) => !!path.basename(filepath).match(/\.tsx?$/i);
  const postsMap: { [filepath: string]: Promise<IPost> } = files
    .filter(validPostFilepath)
    .reduce(postsReducer, {});
  const pagesMap: { [filepath: string]: Promise<IPage> } = files
    .filter(validPageFilepath)
    .reduce(pagesReducer, {});
  const [pages, posts]: [IPage[], IPost[]] = await Promise.all([
    Promise.all([...Object.values(pagesMap)]),
    Promise.all([...Object.values(postsMap)]),
  ]);

  const writes = Object.entries({ ...pagesMap, ...postsMap }).reduce<{
    [filepath: string]: Promise<string>;
  }>(
    (carry, [filepath, content]) => ({
      ...carry,
      [filepath]: (content as Promise<IPage>).then((html) =>
        writeOutFile(filepath, html, pages, posts, outDir),
      ),
    }),
    {},
  );

  return writes;
};

////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////
(async (sitePath: string, outDir: string) => {
  await fs.remove(outDir);
  const startTime = Date.now();
  console.info("Regenerating Site...");
  const fileWrites = await getSiteFiles(sitePath, outDir);
  const files = await Promise.all(
    Object.entries(fileWrites).map(([file, write]) =>
      write
        .then((filepath) => ({ filepath, time: `${Date.now() - startTime}ms` }))
        .catch((error) => ({ filepath: file, error })),
    ),
  );
  console.table(files);
  console.info(`Site regenerated in: ${Date.now() - startTime}ms`);
})(path.join(__dirname), path.join(__dirname, "..", "out")).catch(console.error);
