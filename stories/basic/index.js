import React from "react";
import { storiesOf } from "@storybook/react";
import Buttons from "./buttons";
import GridLayout from "./GridLayout";

storiesOf("基础组件", module)
  .addWithJSX("按钮（Button）", () => <Buttons />)
  .addWithJSX("布局(Grid)", () => <GridLayout/>)
;
