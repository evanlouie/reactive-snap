import fs from "fs";
import htmlMinifier from "html-minifier";
import sass from "node-sass";
import path from "path";
import { promisify } from "util";

export class File {
  public static async getCSS({ includePaths } = { includePaths: [__dirname] }): Promise<string> {
    const scss = await promisify(fs.readFile)(path.join(__dirname, "styles.scss"), {
      encoding: "utf8",
    });
    return new Promise<string>((resolve, reject) => {
      sass.render({ data: scss, includePaths }, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result.css.toString());
        }
      });
    });
  }
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

export const minify = async (html: string): Promise<string> => {
  return htmlMinifier.minify("<!DOCTYPE html>" + html, {
    decodeEntities: true, // needed to excape html entities react uses for '/" in style attributes
    minifyCSS: true,
    minifyJS: true,
  });
};
