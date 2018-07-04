import fs from "fs-extra";
import HighlightJS from "highlight.js";
import marked from "marked";
import path from "path";
import React from "react";
import { IPost } from "../types";

interface IState {
  posts: IPost[];
}

export class PostsContext extends React.Component<IState, IState> {
  private static context: React.Context<IState>;

  private static readonly defaultState: IState = {
    posts: [],
  };

  private static get Context() {
    return this.context
      ? this.context
      : (this.context = React.createContext<IState>(this.defaultState));
  }

  public static get Consumer(): React.Consumer<IState> {
    return this.Context.Consumer;
  }

  public state = {
    ...PostsContext.defaultState,
    ...this.props,
  };

  public render() {
    const { Provider } = PostsContext.Context;
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

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
  return {
    title: path.basename(filepath).match(/\.(md|markdown)$/i)
      ? filename
          .replace(/-/g, " ")
          .split(".")[0]
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : filename,
    body: <div dangerouslySetInnerHTML={{ __html: html }} />,
    postDate: date ? new Date(date[1]) : new Date(),
    tags: [],
    filepath,
  };
};
