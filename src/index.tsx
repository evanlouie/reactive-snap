import * as fs from "fs";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
// import * as ReactDOM from "react-dom";

const context = React.createContext<{ message: string }>({ message: "why, hello there." });

const Goodbye: React.StatelessComponent<{ message: string }> = props => (
  <div className="Goodbye" style={{ display: "grid" }}>
    {props.message}
  </div>
);

const Hello: React.StatelessComponent = props => {
  const { Provider, Consumer } = context;
  return (
    <div className="Hello">
      <Consumer>{state => <Goodbye message={state.message} />}</Consumer>
      <h1>HI</h1>
    </div>
  );
};

const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Hello));

console.log(html);
