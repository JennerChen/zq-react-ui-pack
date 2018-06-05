import React from "react";
import { configure, addDecorator } from "@storybook/react";

const ThemeProviderWrap = storyFn => <div id={ "test-id" } >{storyFn()}</div>;

addDecorator(ThemeProviderWrap);

function loadStories() {
  require("../stories/basic/index");
  // You can require as many stories as you need.
}

configure(loadStories, module);
