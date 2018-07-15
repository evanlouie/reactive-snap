import HighlightJS from "highlight.js";
import React, { StatelessComponent } from "react";
import {
  Euler1,
  Euler10,
  Euler11,
  Euler12,
  Euler2,
  Euler3,
  Euler4,
  Euler5,
  Euler6,
  Euler7,
  Euler8,
  Euler9,
  IEulerProblem,
} from "../server/euler";

const generateEulerID = (problemNumber: number) => `euler-problem-${problemNumber}`;
const Euler: StatelessComponent<{ problems: IEulerProblem[] }> = ({ problems }) => (
  <div className="Euler">
    <h1>Project Euler</h1>
    <div>
      <h2>Table Of Contents</h2>
      <ul>
        {problems.map((problem) => (
          <li key={problem.problemNumber}>
            <a href={"#" + generateEulerID(problem.problemNumber)}>
              {`Problem ${problem.problemNumber} - ${problem.question
                .split("\n")
                .map((str) => str.trim())
                .join(" ")
                .slice(0, 80) + "..."}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div
      className="problems"
      style={{
        display: "grid",
        gridTemplate: "auto / repeat(auto-fill, minmax(25em, 1fr))",
        gap: "1em",
      }}
    >
      {problems.map((problem) => (
        <div key={problem.problemNumber} className="Problem">
          <h2 id={generateEulerID(problem.problemNumber)}>Problem {problem.problemNumber}</h2>
          <h3>Question</h3>
          <pre>
            {problem.question
              .split("\n")
              .map((str) => str.trim())
              .join("\n")
              .trim()}
          </pre>
          <h3>Answer</h3>
          <pre>
            <code
              dangerouslySetInnerHTML={{
                __html: HighlightJS.highlightAuto(problem.answer.toString().trim(), ["javascript"])
                  .value,
              }}
            />
          </pre>
        </div>
      ))}
    </div>
  </div>
);

export default (() => (
  <Euler
    problems={[
      Euler1,
      Euler2,
      Euler3,
      Euler4,
      Euler5,
      Euler6,
      Euler7,
      Euler8,
      Euler9,
      Euler10,
      Euler11,
      Euler12,
    ]}
  />
)) as StatelessComponent;
