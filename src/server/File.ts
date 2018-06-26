import fs from "fs";
import htmlMinifier from "html-minifier";
import sass from "node-sass";
import path from "path";
import { promisify } from "util";

export class File {
  private static _cache: Map<string, string> = new Map();

  private static getFile(pathname: string): string {
    if (!this._cache.has(pathname)) {
      this._cache.set(pathname, fs.readFileSync(pathname, { encoding: "utf8" }));
    }
    return this._cache.get(pathname) as string;
  }

  public static get turbolinks(): string {
    return this.getFile(require.resolve("turbolinks"));
  }

  public static get normalizecss(): string {
    return this.getFile(require.resolve("normalize.css"));
  }
}

export const minify = async (html: string): Promise<string> =>
  htmlMinifier.minify("<!DOCTYPE html>" + html, {
    decodeEntities: true, // needed to excape html entities react uses for '/" in style attributes
    minifyCSS: true,
    minifyJS: true,
  });

export const getCSS = async ({ includePaths } = { includePaths: [__dirname] }): Promise<string> =>
  promisify(fs.readFile)(path.join(__dirname, "styles.scss"), {
    encoding: "utf8",
  })
    .then((scss) => promisify(sass.render)({ data: scss, includePaths }))
    .then((result) => result.css.toString());
