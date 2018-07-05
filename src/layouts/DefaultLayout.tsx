import path from "path";
import React, { StatelessComponent } from "react";
import { Logo } from "../server/Icons";
import { ILayout } from "../types";

export const DefaultLayout: React.StatelessComponent<ILayout> = ({ pages, posts, children }) => {
  const logoWidth = "3em";
  return (
    <div
      className="DefaultLayout"
      style={{
        margin: "auto",
        padding: "1em",
        maxWidth: "960px",
        display: "grid",
        gridTemplate:
          "'header menu menu' auto" +
          "'body body body' auto" +
          // "'footer footer footer' auto / 3em auto auto",
          `'footer footer footer' auto / ${logoWidth} auto auto`,
        rowGap: "1em",
      }}
    >
      <div className="Header" style={{ gridArea: "header" }}>
        <a href="/">
          <span className="InlineIcon" style={{ display: "inline-block", width: logoWidth }}>
            <Logo />
          </span>
        </a>
      </div>
      <nav className="Menu" style={{ gridArea: "menu" }}>
        <ul>
          {pages.map((page) => (
            <li key={page.title}>
              <a href={"/" + page.url}>{page.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <main className="Main" style={{ gridArea: " body" }}>
        {children}
      </main>
      <div className="Footer" style={{ gridArea: "footer" }}>
        <div style={{ textAlign: "center" }}>
          All content copyright Evan Louie © {new Date().getFullYear()} • All rights reserved.
        </div>
      </div>
      <div
        className="Posts"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          background: "white",
          border: "1px solid grey",
          maxWidth: "15em",
        }}
      >
        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <a href={"/" + post.url}>{post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
