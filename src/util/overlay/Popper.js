import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { portal } from "../decorators";
import Arrow from "./Arrow";
import Popper from "popper.js";

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

  state = {
    popperProps: null
  };

  componentDidMount() {
    const {
      overlay: { node, placement, allowArrow, flip }
    } = this.props;

    this.popper = new Popper(node, this.container, {
      placement: placement,
      eventsEnabled: true,
      positionFixed: false,
      modifiers: {
        flip: { enabled: flip },
        computeStyle: { gpuAcceleration: false },
        arrow: {
          enabled: allowArrow,
          element: this.arrow
        },
        applyStyle: { enabled: false },
        updateStateModifier: {
          enabled: true,
          order: 900,
          fn: data => {
            this.setState({
              popperProps: data
            });
            return data;
          }
        }
      }
    });

    document.addEventListener("click", this.autoCloseOverlay);
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }

    document.removeEventListener("click", this.autoCloseOverlay);
  }

  getContainerStyle() {
    const {
      overlay: { offset, zIndex },
      opacity,
      scale
    } = this.props;
    const { popperProps } = this.state;
    if (!popperProps) return {};
    let transformOrigin = "",
      scaleOrient = "",
      offsetX = 0,
      offsetY = 0;
    switch (popperProps.placement) {
      case "top":
        transformOrigin = "bottom center";
        offsetY = -offset;
        scaleOrient = "scaleY";
        break;
      case "left":
        transformOrigin = "right center";
        offsetX = -offset;
        scaleOrient = "scaleX";
        break;
      case "right":
        transformOrigin = "left center";
        offsetX = offset;
        scaleOrient = "scaleX";
        break;
      case "bottom":
      default:
        transformOrigin = "top center";
        offsetY = offset;
        scaleOrient = "scaleY";
    }

    return {
      zIndex,
      opacity,
      transform: `translate(${popperProps.styles.left + offsetX}px,${popperProps.styles.top +
        offsetY}px) ${scaleOrient}(${scale})`,
      transformOrigin: transformOrigin
    };
  }

  getArrowProps() {
    const {
      overlay: { arrowStyleProps }
    } = this.props;
    const { popperProps } = this.state;
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

  autoCloseOverlay = e => {
    const {
      popper,
      props: {
        overlay: { autoClose, show, node, closeOverlay }
      }
    } = this;
    if (!autoClose) return;
    if (!show) return;
    if (!popper) return;
    if (node.contains(e.target) || this.container.contains(e.target)) return;
    closeOverlay();
  };

  render() {
    const {
      overlay: { overlayContent, allowArrow }
    } = this.props;
    return (
      <Container
        innerRef={container => (this.container = container)}
        style={this.getContainerStyle()}>
        {allowArrow ? (
          <Arrow innerRef={arrow => (this.arrow = arrow)} {...this.getArrowProps()} />
        ) : null}
        {typeof overlayContent === "function" ? overlayContent(this.overlay) : overlayContent}
      </Container>
    );
  }
}
