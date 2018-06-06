import React, { Component } from "react";
import PropTypes from "prop-types";
import { stripUnit } from "polished";
import { withRipple } from "../util";
import IconButton from "./IconButton";

import { BaseBtn, LinkBtn } from "./BaseBtn";

const transStyleLineHeight = style => {
  if (style && style.height && stripUnit(style.height) >= 12) {
    return { ...style, lineHeight: stripUnit(style.height) + "px" };
  }
  return style;
};

@withRipple
class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(["primary", "default", "revert"]),
    shape: PropTypes.oneOf(["default"]),
    tagName: PropTypes.oneOf(["button", "a"])
  };

  static defaultProps = {
    type: "default",
    shape: "default",
    tagName: "button",
    style: {}
  };

  render() {
    const { tagName, children, shape, style, ...rest } = this.props;

    const Comp = tagName === "button" ? BaseBtn : LinkBtn;
    return (
      <Comp shape={shape} style={transStyleLineHeight(style)} {...rest}>
        {children}
      </Comp>
    );
  }
}

Button.Icon = IconButton;

export default Button;
