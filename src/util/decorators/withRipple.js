import React, { Component, Fragment } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { decorate } from "./util";
import { randomStr } from "../randomStr";

const RippleContainer = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const RippleEffect = keyframes`
    to {
    opacity: 0;
    transform: scale(2);
  }
`;

const Ripple = styled.span`
  transform: scale(0);
  border-radius: 100%;
  position: absolute;
  opacity: 0.75;
  background-color: ${props => (props.color ? props.color : "#fff")};
  animation: ${RippleEffect} 0.8s;
  pointer-events: none;
  user-select: none;
`;

function getDecorator(withArgs, allowRipple) {
  return Comp => {
    const StyledComp = styled(Comp)`
      overflow: hidden;
      position: relative;
    `;

    return class extends Component {
      static propTypes = {
        allowRipple: PropTypes.bool,
        rippleColor: PropTypes.string
      };

      static defaultProps = {
        disabled: false,
        allowRipple: withArgs ? allowRipple : true
      };

      state = {
        currentRipple: null
      };

      componentDidMount() {
        this.dom = findDOMNode(this.component);
        this.dom.addEventListener("mousedown", this.showRipple);
      }

      componentWillUnmount() {
        this.dom.removeEventListener("mousedown", this.showRipple);
      }

      cleanRipple(key) {
        this.setState({
          currentRipple: null
        });
      }

      showRipple = e => {
        if (!this.props.allowRipple || this.props.disabled) return;
        const { left, top } = this.dom.getBoundingClientRect();
        const size = this.dom.offsetWidth;
        let x = e.pageX - left - size / 2;
        let y = e.pageY - top - size / 2;
        this.setState({
          currentRipple: {
            key: randomStr(),
            x,
            y,
            size
          }
        });
      };

      render() {
        const { ref, allowRipple, rippleColor, children, ...rest } = this.props;
        const { currentRipple } = this.state;
        return (
          <StyledComp ref={component => (this.component = component)} {...rest}>
            <Fragment>
              {children}
              {currentRipple ? (
                <RippleContainer>
                  <Ripple
                    color={rippleColor}
                    key={currentRipple.key}
                    style={{
                      top: currentRipple.y,
                      left: currentRipple.x,
                      height: currentRipple.size,
                      width: currentRipple.size
                    }}
                    onAnimationEnd={() => this.cleanRipple(currentRipple.key)}
                  />
                </RippleContainer>
              ) : null}
            </Fragment>
          </StyledComp>
        );
      }
    };
  };
}

export const withRipple = function(allowRipple) {
  const isReactElement = typeof arguments[0] === "function";
  const decorator = getDecorator(!isReactElement, allowRipple);
  return decorate(!isReactElement, decorator, arguments);
};
