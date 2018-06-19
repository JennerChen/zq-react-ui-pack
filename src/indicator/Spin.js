import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";
import PropTypes from "prop-types";
import { ifProp } from "styled-tools";
import styles from "../styles";

const Rotate = keyframes`
  100% { transform: rotate(360deg); }
`;

const Dash = keyframes`
    0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -120px;
  }
`;

const Container = styled.div`
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  ${ifProp(
    "pause",
    css`
      transform: rotate(-90deg);
    `,
    css`
      animation: ${Rotate} 1.4s linear infinite;
    `
  )};
`;

const Spinner = styled.circle`
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  transform-origin: center;
  fill: none;
  stroke-linecap: round;
  ${ifProp(
    "pause",
    css`
      stroke-dasharray: 0, 126px;
      transition: stroke-dasharray 0.3s ease-in-out;
    `,
    css`
      animation: ${Dash} 1.4s ease-in-out infinite;
    `
  )};
`;
export default class extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    style: PropTypes.object,
    pause: PropTypes.bool,
    value: PropTypes.number
  };

  static defaultProps = {
    size: 24,
    color: styles.primary,
    style: {},
    pause: false,
    value: 0
  };

  render() {
    const { size, color, style, pause, value } = this.props;
    return (
      <Container pause={pause} style={{ style, width: size, height: size }}>
        <svg viewBox={"22 22 44 44"} style={{ width: size, height: size }}>
          <Spinner
            pause={pause}
            cx={44}
            cy={44}
            r={20.2}
            fill={"none"}
            strokeWidth={"3.6"}
            stroke={color}
            style={{
              strokeDasharray: pause ? `${1.26 * value}px, ${126 - 1.26 * value}px ` : null
            }}
          />
        </svg>
      </Container>
    );
  }
}
