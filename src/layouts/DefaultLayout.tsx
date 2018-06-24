import React from "react";
import { ILayout } from "../types";

export const DefaultLayout: React.StatelessComponent<ILayout> = ({ pages, posts, children }) => (
  <div
    className="DefaultLayout"
    style={{
      display: "grid",
    }}
  >
    <div className="Header">
      <h1>Evan Louie</h1>
    </div>
    <div className="Menu">
      <ul>{pages.map(page => <li key={page.title}>{page.title}</li>)}</ul>
    </div>
    <div className="Body">{children}</div>
    <div className="Posts">
      <ul>
        {posts.map(post => (
          <li key={post.title}>
            <a href={`/posts/${post.title}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
    <div className="Footer">All content copyright Evan Louie © 2018 • All rights reserved.</div>
  </div>
);
