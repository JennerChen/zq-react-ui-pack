import React, { Component } from "react";
import PropTypes from "prop-types";
import { action } from "@storybook/addon-actions";
import { Divider } from "rebass";
import { Button, Loading } from "../../src";

function req() {
    console.log(1111);
    return new Promise(res => {
        setTimeout(res, 2000);
    });
}

export default class Buttons extends Component {
    render() {
        return (
            <div>
                <Button onClick={action("clicked")}>基础按钮</Button>

                <Divider />

                <Button onClick={action("clicked")} disabled={true}>
                    按钮不可用
                </Button>

                <Divider />

                <Button onClick={req}>点击之后加载中</Button>

                <Divider />
                <div>尺寸</div>
                <Button onClick={action("clicked")} fontSize={30}>
                    <Loading size={30} mr={1} color={"#fff"} />
                    加载中
                </Button>
            </div>
        );
    }
}
