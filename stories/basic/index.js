import React from "react";
import { storiesOf } from "@storybook/react";
import Buttons from "./buttons";
import GridLayout from "./GridLayout";

storiesOf("基础组件", module)
  .add("按钮（Button）", () => <Buttons />)
  .add("布局(Grid)", () => <GridLayout/>)
;
