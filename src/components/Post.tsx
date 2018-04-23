import * as React from "react";
import { IPost } from "../types";

export const Post: React.StatelessComponent<IPost> = ({ title, body }) => (
  <div className="Post">
    <h1 className="Post__title">{title}</h1>
    <div className="Post__body">{body}</div>
  </div>
);
