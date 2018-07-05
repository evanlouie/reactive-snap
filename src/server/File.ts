import fs from "fs-extra";
import htmlMinifier from "html-minifier";
import sass from "node-sass";
import path from "path";
import uglifyJS from "uglify-js";
import { promisify } from "util";

////////////////////////////////////////////////////////////////////////////////
// Caches
////////////////////////////////////////////////////////////////////////////////
interface ICache {
  [key: string]: string;
}
const fileCache: ICache = {};
const cssCache: ICache = {};
const jsCache: ICache = {};

////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////
const getFile = async (pathname: string): Promise<string> =>
  !!fileCache[pathname]
    ? fileCache[pathname]
    : fs
        .readFile(pathname, { encoding: "utf8" })
        .then((content) => (fileCache[pathname] = content));

////////////////////////////////////////////////////////////////////////////////
// Public Functions
////////////////////////////////////////////////////////////////////////////////
export const turbolinks = () => getFile(require.resolve("turbolinks"));
export const normalizeCSS = () => getFile(require.resolve("normalize.css"));

/**
 * All in one minifier for full html
 * @param html html string to minify
 */
export const minify = async (html: string): Promise<string> =>
  htmlMinifier.minify(html, {
    decodeEntities: true, // needed to escape html entities react uses for '/" in style attributes
    minifyCSS: true,
    minifyJS: true,
  });

/**
 * Convert `${__dirname}/server/styles.scss` to css
 * @param includePaths Array of directory paths to to search through when using @import in scss files
 */
export const getCSS = async (includePaths = [__dirname]): Promise<string> => {
  const scss = await fs.readFile(path.join(__dirname, "styles.scss"), { encoding: "utf8" });
  const result = await promisify(sass.render)({ data: scss, includePaths });
  return result.css.toString();
};

const _compressCSS = async (css: string) =>
  promisify(sass.render)({ data: css, outputStyle: "compressed" }).then((result) =>
    result.css.toString(),
  );

/**
 * Compress a CSS string and cache the response
 * @param css string to compress
 */
export const compressCSS = async (css: string): Promise<string> =>
  cssCache[css] ? cssCache[css] : _compressCSS(css).then((style) => (cssCache[css] = style));

const _compressJS = async (js: string) => Promise.all([uglifyJS.minify(js).code]);

/**
 * Compress a string of JS and cache the response
 * @param js JS string to compress
 */
export const compressJS = async (js: string): Promise<string> =>
  jsCache[js] ? jsCache[js] : _compressJS(js).then(([minified]) => (jsCache[js] = minified));
