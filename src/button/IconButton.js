import React, { Component, createElement } from "react";
import styled, { css } from "styled-components";
import { switchProp, prop } from "styled-tools";
import PropTypes from "prop-types";
import { darken } from "polished";
import styles from "../styles";
import { withRipple } from "../util";

const Btn = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  position: relative;
  font-size: 12px;
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  height: ${prop("size", "34px")};
  width: ${prop("size", "34px")};
  padding: 5px;
  transition: all 0.3s;
  border-radius: 50%;

  ${switchProp("type", {
    default: css`
      background-color: #fff;
      &:hover {
        background-color: #efefef;
      }
    `,
    primary: css`
      background-color: ${styles.primary};
      &:hover {
        background-color: ${darken(0.1, styles.primary)};
      }
    `
  })};
`;

@withRipple
export default class extends Component {
  static propTypes = {
    type: PropTypes.oneOf(["primary", "default"]),
    tagName: PropTypes.oneOf(["button", "a"]),
    icon: PropTypes.func.isRequired,
    size: PropTypes.number,
    color: PropTypes.string
  };

  static defaultProps = {
    type: "default",
    tagName: "button",
    style: {},
    size: 24
  };

  render() {
    const { children, icon, size, color, type, ...rest } = this.props;
    return (
      <Btn type={type} size={size + 5 * 2 + "px"} {...rest}>
        {createElement(icon, {
          size,
          color: color ? color : type === "primary" ? "#fff" : styles.text.primary
        })}
        {children}
      </Btn>
    );
  }
}
