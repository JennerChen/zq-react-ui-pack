import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Overlay } from "../util";

const TooltipContainer = styled.div`
  border-radius: 5px;
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.65);
  color: #fff;
  font-size: 12px;
`;

let TooltipIndex = 10000;

export default class extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.any,
    disabled: PropTypes.bool,
    trigger: PropTypes.oneOf(["hover", "click"]),
    placement: PropTypes.oneOf(["bottom", "top", "left", "right"]),
    hoverDelay: PropTypes.number,
    style: PropTypes.object,
    arrowColor: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    trigger: "hover",
    placement: "bottom",
    hoverDelay: 200,
    style: {},
    arrowColor: "rgba(0, 0, 0, 0.65)"
  };

  constructor(props) {
    super(props);
    this.state = {
      zIndex: TooltipIndex++
    };
  }

  render() {
    const {
      children,
      className,
      title,
      disabled,
      placement,
      hoverDelay,
      arrowColor,
      style
    } = this.props;

    return (
      <Overlay
        ref={overlay => (this.overlay = overlay)}
        arrow={true}
        arrowColor={arrowColor}
        animation={true}
        autoClose={true}
        trigger={"hover"}
        placement={placement}
        disabled={disabled || !title}
        overlay={
          <TooltipContainer className={className} style={style}>
            {title}
          </TooltipContainer>
        }
        zIndex={this.state.zIndex}
        hoverDelay={hoverDelay}>
        {children}
      </Overlay>
    );
  }
}
