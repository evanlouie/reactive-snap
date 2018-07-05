import path from "path";
import React from "react";
import { IPage } from "../types";

export const convertFileToPage = async (filepath: string): Promise<IPage> => {
  const DefaultExport = require(filepath).default;
  const basename = path.basename(filepath);
  const titleMatch = basename.match(/^(.+)\.tsx?$/i);
  const title = titleMatch
    ? titleMatch[1]
        .split(/(?=[A-Z])/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : basename;
  const body = await (typeof DefaultExport === "function" ? (
    <div className="Page">
      <DefaultExport />
    </div>
  ) : (
    Promise.reject(new Error(`No default export found in ${filepath}`))
  ));
  const url = await ((extensionLess) =>
    extensionLess
      ? path.join("pages", extensionLess[1]).toLowerCase()
      : Promise.reject(new Error(`Could not parse out extension-less filename from ${filepath}`)))(
    path.basename(filepath).match(/^(.+)\.tsx?$/i),
  );

  return {
    title,
    body,
    tags: [],
    filepath,
    url,
  };
};
