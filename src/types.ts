interface IPublishable {
  title: string;
}

export interface IPost extends IPublishable {
  body: string;
  postDate: Date;
}
export interface IPage extends IPublishable {
  body: React.ReactNode;
  layout: ILayout;
}

export interface ILayout {
  posts: IPost[];
  pages: IPage[];
}
