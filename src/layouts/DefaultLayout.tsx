import React from "react";
import { ILayout } from "../types";

export const DefaultLayout: React.StatelessComponent<ILayout> = ({ pages, posts, children }) => (
  <div
    className="DefaultLayout"
    style={{
      display: "grid",
    }}
  >
    <div className="Header">Evan Louie</div>
    <div className="Menu">
      <ul>{pages.map(page => <li key={page.title}>{page.title}</li>)}</ul>
    </div>
    <div className="Body">{children}</div>
    <div className="Posts">
      <ul>{posts.map(post => <li key={post.title}>{post.title}</li>)}</ul>
    </div>
    <div className="Footer">All content copyright Evan Louie © 2018 • All rights reserved.</div>
  </div>
);
