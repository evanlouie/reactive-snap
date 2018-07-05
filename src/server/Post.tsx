import fs from "fs-extra";
import HighlightJS from "highlight.js";
import marked from "marked";
import path from "path";
import React from "react";
import { IPost } from "../types";

const convertMarkdownToHTML = async (markdown: string): Promise<string> =>
  marked.parse(markdown, {
    highlight: (code) => HighlightJS.highlightAuto(code).value,
  });

export const getWritePath = async (post: IPost): Promise<string> =>
  `${path.dirname(post.filepath)}/${post.title}`;

export const convertFileToPost = async (filepath: string): Promise<IPost> => {
  const filename = path.basename(filepath);
  const date = filename.match(/(\d{4}-\d{2}-\d{2})-(.+)/i);
  const html = await fs.readFile(filepath, { encoding: "utf8" }).then(convertMarkdownToHTML);
  const url = await ((extensionLess) =>
    extensionLess
      ? path.join("posts", extensionLess[1]).toLowerCase()
      : Promise.reject(new Error(`Could not parse out extension-less filename from ${filepath}`)))(
    path.basename(filepath).match(/^(.+)\.(md|markdown)$/i),
  );

  const title = ((match, _) =>
    match
      ? match[2]
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : _)(path.basename(filepath).match(/(\d{4}-\d{2}-\d{2})-(.+)\.(md|markdown)$/i), filename);

  const excerpt = html
    .replace(/<[^>]+>/g, "")
    .split("\n")
    .filter((str) => str !== "")
    .map((str) => str.trim())
    .join(" ")
    .split(" ")
    .slice(0, 50)
    .join(" ");

  return {
    title,
    body: <div dangerouslySetInnerHTML={{ __html: html }} />,
    postDate: date ? new Date(date[1]) : new Date(),
    tags: [],
    filepath,
    url,
    excerpt,
  };
};
