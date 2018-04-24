import React from "react";
import { IPost } from "../types";

export const Post: React.StatelessComponent<IPost> = ({ title, body, postDate }) => (
  <div className="Post">
    <h1 className="Post__title">{title}</h1>
    <span>Published: {postDate.toISOString()}</span>
    <div className="Post__body" dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);
