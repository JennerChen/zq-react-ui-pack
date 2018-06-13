import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { portal } from "../decorators";
import Arrow from "./Arrow";
const Container = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  opacity: 0;
  transform-origin: top center;
`;

@portal
@inject("overlay")
@observer
export default class extends Component {
  static propTypes = {
    opacity: PropTypes.number,
    scale: PropTypes.number
  };

  static defaultProps = {
    opacity: 1,
    scale: 1
  };

  componentDidMount() {
    this.props.overlay.initPopper();
  }

  componentWillUnmount() {
    this.props.overlay.destroyPopper();
  }

  getContainerStyle() {
    const {
      overlay: { popperProps, offset },
      opacity,
      scale
    } = this.props;
    if (!popperProps) return {};
    let transformOrigin = "",
      offsetX = 0,
      offsetY = 0;
    switch (popperProps.placement) {
      case "bottom":
        transformOrigin = "top center";
        offsetY = offset;
        break;
      case "top":
        transformOrigin = "bottom center";
        offsetY = -offset;
        break;
      case "left":
        transformOrigin = "right center";
        offsetX = -offset;
        break;
      case "right":
        transformOrigin = "left center";
        offsetX = offset;
    }

    return {
      opacity,
      transform: `translate(${popperProps.styles.left + offsetX}px,${popperProps.styles.top +
        offsetY}px) scaleY(${scale})`,
      transformOrigin: transformOrigin
    };
  }

  getArrowProps() {
    const {
      overlay: { popperProps, arrowStyleProps }
    } = this.props;
    if (!popperProps) return arrowStyleProps;
    let { left, top } = popperProps.arrowStyles;
    return {
      ...arrowStyleProps,
      placement: popperProps.placement,
      style: {
        transform: `translate(
        ${left ? left : 0}px,
        ${top ? top : 0}px)`
      }
    };
  }

  render() {
    const {
      overlay: { overlayContent, bindPopper, allowArrow, bindArrow }
    } = this.props;
    return (
      <Container innerRef={bindPopper} style={this.getContainerStyle()}>
        {allowArrow ? <Arrow innerRef={bindArrow} {...this.getArrowProps()} /> : null}
        {overlayContent}
      </Container>
    );
  }
}
