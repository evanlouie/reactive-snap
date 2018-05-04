import fs from "fs";
import path from "path";
import { promisify } from "util";

export class File {
  private static _turbolinks: string;
  private static _normalizecss: string;

  private static readFile(
    pathname: string,
    { encoding }: { encoding: string } = { encoding: "utf8" },
  ): string {
    return fs.readFileSync(pathname, { encoding });
  }

  public static get turbolinks(): string {
    if (!this._turbolinks) {
      this._turbolinks = this.readFile(require.resolve("turbolinks"));
    }
    return this._turbolinks;
  }

  public static get normalizecss(): string {
    if (!this._normalizecss) {
      this._normalizecss = this.readFile(require.resolve("normalize.css"));
    }
    return this._normalizecss;
  }
}
