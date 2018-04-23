import * as React from "react";
import { IPost } from "../types";

interface IState {
  posts: IPost[];
}

export class PostsContext extends React.Component<IState, IState> {
  // private static defaultState: IState = {
  //   posts: [],
  // };

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
  };

  public render() {
    const { Provider } = PostsContext.Context;
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
