import * as fs from "fs";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
// import * as ReactDOM from "react-dom";

const Hello = (props: any) => (
  <div className="Hello">
    <h1>HI</h1>
  </div>
);

const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Hello));

console.log(html);
