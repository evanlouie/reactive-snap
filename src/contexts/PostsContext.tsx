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
  public static async convertMarkdownToHTML(markdown: string): Promise<string> {
    const html: string = marked.parse(markdown, {
      highlight: code => HighlightJS.highlightAuto(code).value,
    });

    return html;
  }

  public static async convertFileToPost(filepath: string): Promise<IPost> {
    const readFile = promisify(fs.readFile);
    const filename = path.basename(filepath);
    const filedir = path.dirname(filepath);
    const fileContent = await readFile(filepath, { encoding: "utf8" });
    const html = await this.convertMarkdownToHTML(fileContent);

    return {
      title: filename,
      body: html,
      postDate: new Date(),
    };
  }

  public static async convertFilesToPosts(filepaths: string[]): Promise<IPost[]> {
    const posts = await Promise.all(
      filepaths.map(filepath => {
        return PostsContext.convertFileToPost(filepath);
      }),
    );

    return posts;
  }

  public static async getPosts(): Promise<IPost[]> {
    const readdir = promisify(fs.readdir);
    const readFile = promisify(fs.readFile);
    const postsDir = path.join(__dirname, "..", "posts");
    const filenames = await readdir(postsDir);
    const markdownFiles = await Promise.all(
      filenames.map(filename => {
        const filepath = path.join(postsDir, filename);
        return readFile(filepath, { encoding: "utf8" });
      }),
    );
    const posts: IPost[] = filenames.map((filename, index) => {
      return {
        body: marked.parse(markdownFiles[index], {
          highlight: code => HighlightJS.highlightAuto(code).value,
        }),
        postDate: new Date() /** @TODO how to store date? */,
        title: filename,
      };
    });

    return posts;
  }

  public static async state() {
    return {
      posts: await this.getPosts(),
    };
  }

  private static context: React.Context<IState>;

  private static get Context() {
    if (!this.context) {
      this.context = React.createContext<IState>() as React.Context<IState>;
    }
    return this.context;
  }

  public static get Consumer(): React.Consumer<IState> {
    return this.Context.Consumer;
  }

  public state = {
    posts: [],
    ...this.props,
  };

  public render() {
    const { Provider } = PostsContext.Context;
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
