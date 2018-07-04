import React from "react";
import { IPage, IPost } from "../types";

interface IState {
  pages: IPage[];
  posts: IPost[];
}

export class BlogContext extends React.Component<IState, IState> {
  private static context: React.Context<IState>;

  private static readonly defaultState: IState = {
    pages: [],
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
    ...BlogContext.defaultState,
    ...this.props,
  };

  public render() {
    const { Provider } = BlogContext.Context;
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
