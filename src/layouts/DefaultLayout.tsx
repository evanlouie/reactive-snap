import React, { StatelessComponent } from "react";
import { ILayout } from "../types";

const Logo: StatelessComponent = () => (
  <svg viewBox="0 0 189.5 189.5">
    <path
      fill="#6F6F6F"
      d="M94.6.7L.7 94.8l94.1 93.9 93.9-94.1L94.6.7zm-6.3 109.4H51.4l11.2-71h36.9l-1.9 12h-23l-2.5 16h22.1l-1.9 12h-22l-3.1 19h23l-1.9 12zm3.1 43l11.2-71h13.9l-9.4 59h19.7l-1.9 12H91.4z"
    />
  </svg>
);

export const DefaultLayout: React.StatelessComponent<ILayout> = ({ pages, posts, children }) => (
  <div
    className="DefaultLayout"
    style={{
      margin: "auto",
      maxWidth: "960px",
      display: "grid",
      gridTemplate: `
      "header menu menu" auto
      "body body body" auto
      "footer footer footer" auto`,
    }}
  >
    <div className="Header" style={{ gridArea: "header" }}>
      <h1>Evan Louie</h1>
    </div>
    <div className="Menu" style={{ gridArea: "menu" }}>
      <ul>{pages.map(page => <li key={page.title}>{page.title}</li>)}</ul>
    </div>
    <div className="Body" style={{ gridArea: " body" }}>
      {children}
      <div className="Posts">
        <ul>
          {posts.map(post => (
            <li key={post.title}>
              <a href={`/posts/${post.title}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="Footer" style={{ gridArea: "footer" }}>
      All content copyright Evan Louie © {new Date().getFullYear()} • All rights reserved.
    </div>
  </div>
);
