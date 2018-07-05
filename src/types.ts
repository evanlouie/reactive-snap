import React from "react";

export interface IPage {
  title: string;
  body: React.ReactNode;
  tags: string[];
  filepath: string;
  url: string;
}

export interface IPost extends IPage {
  postDate: Date;
  excerpt: string;
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
