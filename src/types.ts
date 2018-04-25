export interface IPost {
  title: string;
  body: string; // html
  postDate: Date;
}
export interface IPage {
  title: string;
  body: React.ReactNode;
}

export interface ILayout {
  posts: IPost[];
  pages: IPage[];
}
