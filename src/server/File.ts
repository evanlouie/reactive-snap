import fs from "fs";
import htmlMinifier from "html-minifier";
import sass from "node-sass";
import path from "path";
import uglifyJS from "uglify-js";
import { promisify } from "util";

const _fileCache = {};
const _cssCache = {};
const _jsCache = {};
const getFile = async (pathname: string): Promise<string> =>
  ((cache: { [key: string]: string } = {}) =>
    !!cache[pathname]
      ? cache[pathname]
      : promisify(fs.readFile)(pathname, { encoding: "utf8" })
          .then((content) => (cache[pathname] = content))
          .then(() => getFile(pathname)))(_fileCache);

// export const highlightJS = () => getFile(require.resolve("highlight.js/lib/highlight.js"));
export const turbolinks = () => getFile(require.resolve("turbolinks"));
export const normalizeCSS = () => getFile(require.resolve("normalize.css"));

/**
 * All in one minifier for full html
 * @param html html string to minify
 */
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
 * Compress a CSS string and cache the response
 * @param css string to compress
 */
export const compressCSS = async (css: string): Promise<string> =>
  ((_css: string, _cache: { [key: string]: string }) =>
    promisify(sass.render)({ data: _css, outputStyle: "compressed" }).then((result) =>
      result.css.toString(),
    ))(css, _cssCache);

/**
 * Compress a string of JS and cache the response
 * @param js JS string to compress
 */
export const compressJS = async (js: string): Promise<string> =>
  ((_js: string, _cache: { [key: string]: string }) =>
    _cache[_js]
      ? _cache[_js]
      : Promise.all([uglifyJS.minify(_js).code])
          .then(([minified]) => (_cache[_js] = minified))
          .then(() => compressJS(js)))(js, _jsCache);
