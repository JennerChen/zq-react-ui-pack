import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { Provider } from "../src";

const ThemeProviderWrap = storyFn => <Provider>{storyFn()}</Provider>;

addDecorator(ThemeProviderWrap);

function loadStories() {
    require("../stories/basic/index");
    // You can require as many stories as you need.
}

configure(loadStories, module);
