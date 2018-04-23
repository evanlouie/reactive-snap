import * as React from "react";

interface IPost {
  title: string;
  body: string;
}

interface IState {
  posts: IPost[];
}

export class PostsContext extends React.Component<IState, IState> {
  private static defaultState: IState = {
    posts: [],
  };

  private static _context: React.Context<IState>;

  private static get Context() {
    if (!this._context) {
      this._context = React.createContext<IState>(this.defaultState);
    }
    return this._context;
  }

  public static get Consumer(): React.Consumer<IState> {
    return this.Context.Consumer;
  }

  public state = {
    ...PostsContext.defaultState,
  };

  public render() {
    const { Provider } = PostsContext.Context;
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
