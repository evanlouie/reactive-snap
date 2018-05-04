import fs from "fs";
import path from "path";
import { promisify } from "util";

export class File {
  private static _cache: { [key: string]: string } = {};

  private static getFile(pathname: string): string {
    if (!this._cache[pathname]) {
      this._cache[pathname] = fs.readFileSync(pathname, { encoding: "utf8" });
    }
    return this._cache[pathname];
  }

  public static get turbolinks(): string {
    return this.getFile(require.resolve("turbolinks"));
  }

  public static get normalizecss(): string {
    return this.getFile(require.resolve("normalize.css"));
  }
}
