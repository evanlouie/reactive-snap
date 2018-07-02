import fs from "fs";
import htmlMinifier from "html-minifier";
import sass from "node-sass";
import path from "path";
import { promisify } from "util";

const _cache: { [key: string]: string } = {};
const getFile = async (pathname: string, cache = _cache): Promise<string> =>
  !!cache[pathname]
    ? cache[pathname]
    : promisify(fs.readFile)(pathname, { encoding: "utf8" })
        .then((content) => (cache[pathname] = content))
        .then(() => getFile(pathname));

// export const highlightJS = () => getFile(require.resolve("highlight.js/lib/highlight.js"));
export const turbolinks = () => getFile(require.resolve("turbolinks"));
export const normalizeCSS = () => getFile(require.resolve("normalize.css"));

export const minify = async (html: string): Promise<string> =>
  htmlMinifier.minify("<!DOCTYPE html>" + html, {
    decodeEntities: true, // needed to escape html entities react uses for '/" in style attributes
    minifyCSS: true,
    minifyJS: true,
  });

/**
 * Convert `${__dirname}/server/styles.scss` to css
 * @param includePaths Array of directory paths to to search through when using @import in scss files
 */
export const getCSS = async (includePaths = [__dirname]): Promise<string> =>
  promisify(fs.readFile)(path.join(__dirname, "styles.scss"), {
    encoding: "utf8",
  })
    .then((scss) => promisify(sass.render)({ data: scss, includePaths }))
    .then((result) => result.css.toString());

/**
 * Compress a CSS string using SASS render to compress
 * @param css string to compress
 */
export const compressCSS = async (css: string): Promise<string> =>
  promisify(sass.render)({ data: css, outputStyle: "compressed" }).then((result) =>
    result.css.toString(),
  );
