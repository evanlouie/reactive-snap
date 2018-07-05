import React from "react";
import { IPost } from "../types";

export const Post: React.StatelessComponent<IPost> = ({ title, body, postDate, tags }) => (
  <article className="Post">
    <h1 className="Post__title">{title}</h1>
    <aside>
      <code>{tags.join(", ")}</code>
    </aside>
    <time>Published: {postDate.toISOString()}</time>
    <div className="Post__body">{body}</div>
  </article>
);
