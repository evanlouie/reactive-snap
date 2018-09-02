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
  const lineNosWithTripleDash = lines.reduce<number[]>(
    (lineNos, line, lineNo) => (line === "---" ? lineNos.concat(lineNo) : lineNos),
    [],
  );
  const hasFrontMatter = lineNosWithTripleDash.length >= 2 && lineNosWithTripleDash[0] === 0;

  return {
    html: hasFrontMatter
      ? await convertMarkdownToHTML(lines.slice(lineNosWithTripleDash[1] + 1).join("\n"))
      : await convertMarkdownToHTML(markdown),
    frontMatter: hasFrontMatter
      ? yaml.safeLoad(
          lines.slice(lineNosWithTripleDash[0] + 1, lineNosWithTripleDash[1]).join("\n"),
        )
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
  const noExtension = path.basename(filepath).match(/^(.+)\.(md|markdown)$/i);
  const url = await (noExtension
    ? path.join("posts", noExtension[1]).toLowerCase()
    : Promise.reject(new Error(`Could not parse out extension-less filename from ${filepath}`)));
  const { html, frontMatter } = await parseMarkdown(filepath);
  const isFormattedFilename = path
    .basename(filepath)
    .match(/(\d{4}-\d{2}-\d{2})-(.+)\.(md|markdown)$/i);
  const title = isFormattedFilename
    ? isFormattedFilename[2]
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : filename;
  const excerpt =
    html
      .replace(/<[^>]+>/g, "")
      .split("\n")
      .join(" ")
      .split(" ")
      .filter((word) => word)
      .slice(0, 50)
      .join(" ")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim() + "...";

  return {
    title,
    filepath,
    url,
    excerpt,
    tags: [],
    ...frontMatter,
    body: <div dangerouslySetInnerHTML={{ __html: html }} />,
    postDate: date ? new Date(date[1]) : new Date(),
  };
};
