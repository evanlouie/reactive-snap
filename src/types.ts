import React from "react";

export interface IPage {
  title: string;
  body: React.ReactNode;
}
export interface IPost extends IPage {
  postDate: Date;
}

export interface ILayout {
  posts: IPost[];
  pages: IPage[];
}

export interface IDirectory {
  index: React.ReactNode;
  children: {
    [key: string]: IDirectory;
  };
}
