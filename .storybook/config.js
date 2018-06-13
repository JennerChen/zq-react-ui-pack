import React from "react";
import { configure, addDecorator, setAddon } from "@storybook/react";
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const ThemeProviderWrap = storyFn => <div>{storyFn()}</div>;

addDecorator(ThemeProviderWrap);

function loadStories() {
  require("../stories/basic/index");
//  require("../stories/others/index");
  require("../stories/overlay/index");
  // You can require as many stories as you need.
}

configure(loadStories, module);
