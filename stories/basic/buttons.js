import React, { Component } from "react";
import PropTypes from "prop-types";
import { action } from "@storybook/addon-actions";
import { Button, utils } from "../../src";
import { ArrowDropDownCircle, VerticalAlignTop } from "styled-icons/material";
function req() {
  return new Promise(res => {
    setTimeout(res, 2000);
  });
}

export default class Buttons extends Component {
  render() {
    return (
      <div>
        <ArrowDropDownCircle size={24} />

        <Button tagName={"a"} style={{ height: 30 }} disabled>
          按钮禁用
        </Button>

        <Button onClick={req} style={{ height: 30, margin: "0 5px" }} disabled type={"primary"}>
          按钮禁用
        </Button>

        <Button onClick={req} type={"primary"} style={{ margin: "0 5px" }}>
          按钮<ArrowDropDownCircle size={20} style={{ marginLeft: 5 }} />
        </Button>

        <Button onClick={req} type={"primary"} style={{ margin: "0 5px" }}>
          点击之后加载中
          <VerticalAlignTop size={12} />
        </Button>

        <Button.Icon
          type={"primary"}
          size={24}
          icon={VerticalAlignTop}
          style={{ margin: "0 5px" }}
          onClick={ () => console.log(111) }
        />

        <Button.Icon size={24} icon={VerticalAlignTop} />
      </div>
    );
  }
}
