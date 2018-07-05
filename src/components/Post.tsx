import React from "react";
import { IPost } from "../types";

export const Post: React.StatelessComponent<IPost> = ({ title, body, postDate, excerpt, tags }) => (
  <article className="Post">
    <h1 className="Post__title">{title}</h1>
    <details>
      <summary>{excerpt}</summary>
      <code>{tags.join(", ")}</code>
    </details>
    <time>Published: {postDate.toISOString()}</time>
    <div className="Post__body">{body}</div>
  </article>
);
