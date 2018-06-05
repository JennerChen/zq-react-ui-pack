import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { prop, switchProp } from "styled-tools";
import { withRipple } from "../util";

const BaseBtn = styled.button`
  border: none;
  position: relative;
  font-size: 12px;
  background-color: ${switchProp("type", {
    default: "#fff",
    primary: "#26a69a"
  })};
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  outline: none;
  border-radius: 4px;
  padding: 0 16px;
  height: 30px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

@withRipple
export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(["primary", "default"]),
    shape: PropTypes.oneOf(["circle", "default"])
  };

  static defaultProps = {
    type: "default",
    shape: "default"
  };

  state = {
    toggle: false
  };

  setToggle(flag) {
    this.setState({
      toggle: flag
    });
  }

  render() {
    const { onClick, children, ...rest } = this.props;
    const { toggle } = this.state;
    return <BaseBtn {...rest}>{children}</BaseBtn>;
  }
}
