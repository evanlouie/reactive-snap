import fs from "fs-extra";
import HighlightJS from "highlight.js";
import yaml from "js-yaml";
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

/**
 * Parse a markdown file return the compiled HTML and front matter
 * @param filepath path to target markdown file
 */
const parseMarkdown = async (
  filepath: string,
): Promise<{ html: string; frontMatter: { [key: string]: any } }> => {
  const markdown = await fs.readFile(filepath, { encoding: "utf8" });
  const lines = markdown.split("\n");
  const tripleDashLineNos: number[] = lines.reduce<number[]>(
    (lineNos, line, lineNo) => (line === "---" ? lineNos.concat(lineNo) : lineNos),
    [],
  );
  const hasFrontMatter = tripleDashLineNos.length >= 2 && tripleDashLineNos[0] === 0;

  return {
    html: hasFrontMatter
      ? await convertMarkdownToHTML(lines.slice(tripleDashLineNos[1] + 1).join("\n"))
      : await convertMarkdownToHTML(markdown),
    frontMatter: hasFrontMatter
      ? yaml.safeLoad(lines.slice(tripleDashLineNos[0] + 1, tripleDashLineNos[1]).join("\n"))
      : {},
  };
};

/**
 * Converts a markdown file to a Post.
 * note: Any FrontMatter in the markdown file takes precedence over computed values. Dangerous if types conflict
 * @param filepath path of markdown file to convert
 */
export const convertFileToPost = async (filepath: string): Promise<IPost> => {
  const filename = path.basename(filepath);
  const date = filename.match(/(\d{4}-\d{2}-\d{2})-(.+)/i);
  const url = await ((extensionLess) =>
    extensionLess
      ? path.join("posts", extensionLess[1]).toLowerCase()
      : Promise.reject(new Error(`Could not parse out extension-less filename from ${filepath}`)))(
    path.basename(filepath).match(/^(.+)\.(md|markdown)$/i),
  );
  const { html, frontMatter } = await parseMarkdown(filepath);
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
    .join(" ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  return {
    title,
    tags: [],
    filepath,
    url,
    excerpt,
    ...frontMatter,
    body: <div dangerouslySetInnerHTML={{ __html: html }} />,
    postDate: date ? new Date(date[1]) : new Date(),
  };
};
