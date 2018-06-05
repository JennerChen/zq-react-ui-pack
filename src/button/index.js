import React, { Component } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { stripUnit } from "polished";
import { withRipple } from "../util";
import styles from "../styles";

import { BaseBtn, LinkBtn } from "./BaseBtn";

const transStyleLineHeight = style => {
  if (style && style.height && stripUnit(style.height) >= 12) {
    return { ...style, lineHeight: stripUnit(style.height) + "px" };
  }
  return style;
};

@withRipple
export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(["primary", "default", "revert"]),
    shape: PropTypes.oneOf(["circle", "default"]),
    tagName: PropTypes.oneOf(["button", "a"])
  };

  static defaultProps = {
    type: "default",
    shape: "default",
    tagName: "button",
    style: {}
  };

  handleOnClick = e => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    const { onClick, tagName, children, shape, style, ...rest } = this.props;

    const Comp = tagName === "button" ? BaseBtn : LinkBtn;
    return (
      <Comp
        shape={shape}
        onClick={this.handleOnClick}
        style={transStyleLineHeight(style)}
        {...rest}>
        {children}
      </Comp>
    );
  }
}
