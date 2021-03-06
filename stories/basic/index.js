import React from "react";
import { storiesOf } from "@storybook/react";
import Buttons from "./buttons";
import GridLayout from "./GridLayout";
import Selects from "./Selects";
import Indicators from "./Indicators";
import Checkboxs from "./checkboxs";
import Radios from "./radios";
import Cards from "./cards";
import Inputs from "./inputs";

storiesOf("基础组件", module)
  .addWithJSX("按钮（Button）", () => <Buttons />)
  .addWithJSX("布局(Grid)", () => <GridLayout />)
  .addWithJSX("input", () => <Inputs />)
  .addWithJSX("下拉框", () => <Selects />)
  .addWithJSX("checkbox", () => <Checkboxs />)
  .addWithJSX("Indicator", () => <Indicators />)
  .addWithJSX("Radios", () => <Radios />)
  .addWithJSX("Cards", () => <Cards />);
