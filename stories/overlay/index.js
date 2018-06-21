import React from "react";
import { storiesOf } from "@storybook/react";
import Overlay from "./simpleOverlay";
import Tooltips from "./tooltips";

storiesOf("弹层", module)
  .addWithJSX("Overlay", () => <Overlay />)
  .addWithJSX("Tooltip", () => <Tooltips/>)
;
