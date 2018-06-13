import React from "react";
import { storiesOf } from "@storybook/react";
import Overlay from "./simpleOverlay";

storiesOf("弹层", module)
  .addWithJSX("Overlay", () => <Overlay />)
;
