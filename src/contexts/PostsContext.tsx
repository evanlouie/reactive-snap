import fs from "fs";
import HighlightJS from "highlight.js";
import marked from "marked";
import path from "path";
import React from "react";
import { promisify } from "util";
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
    if (!this.context) {
      this.context = React.createContext<IState>(this.defaultState) as React.Context<IState>;
    }
    return this.context;
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

const getTitle = async (filepath: string): Promise<string> =>
  ((filename = path.basename(filepath)) =>
    filename.match(/\.(md|markdown)$/i) ? filename.replace("-", " ").split(".")[0] : filename)();

const convertMarkdownToHTML = async (markdown: string): Promise<string> =>
  marked.parse(markdown, {
    highlight: (code) => HighlightJS.highlightAuto(code).value,
  });

export const getWritePath = async (filepath: string): Promise<string> =>
  ((fileDirectory = path.dirname(filepath)) => `${fileDirectory}/${getTitle(filepath)}`)();

export const convertFileToPost = async (filepath: string): Promise<IPost> =>
  ((
    readFile = promisify(fs.readFile),
    filename = path.basename(filepath),
    // filedir = path.dirname(filepath),
  ) =>
    readFile(filepath, { encoding: "utf8" })
      .then((content) => Promise.all([convertMarkdownToHTML(content), getTitle(filepath)]))
      .then(([html, title], date = filename.match(/(\d{4}-\d{2}-\d{2})-(.+)/i)) => ({
        title,
        body: <div dangerouslySetInnerHTML={{ __html: html }} />,
        postDate: date ? new Date(date[1]) : new Date(),
      })))();
