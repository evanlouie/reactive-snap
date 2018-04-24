import * as fs from "fs";
import * as marked from "marked";
import * as path from "path";
import * as React from "react";
import { promisify } from "util";
import { IPost } from "../types";

interface IState {
  posts: IPost[];
}

export class PostsContext extends React.Component<IState, IState> {
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
        body: marked.parse(markdownFiles[index]),
        postDate: new Date(),
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
