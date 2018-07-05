import React, { StatelessComponent } from "react";
import { IPage } from "../types";

export const Page: StatelessComponent<IPage> = (props) => <div className="Page">{props.body}</div>;
