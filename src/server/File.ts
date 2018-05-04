import fs from "fs";
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

  public static get css(): string {
    const scss = fs.readFileSync(path.join(__dirname, "styles.scss"), { encoding: "utf8" });
    const css = sass.renderSync({ data: scss }).css.toString();
    return css;
  }
}
