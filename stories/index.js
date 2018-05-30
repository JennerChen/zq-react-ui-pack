import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Provider } from "../src";
import Button from "../src/button";
import Buttons from "./basic/buttons";

storiesOf("基础组件", module)
    .add("按钮（Button）", () => (
        <Provider>
            <Button onClick={action("clicked")} loading={true}>
                Hello Button 111
            </Button>
        </Provider>
    ))
    .add("with some emoji", () => <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>);
