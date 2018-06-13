import React, { Component, Fragment, Children, cloneElement } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Transition } from "react-spring";
import Popper from "./Popper";
@inject("overlay")
@observer
export default class extends Component {
  componentDidMount() {
    this.props.overlay.setupOverlay(this);
  }

  componentWillUnmount() {
    this.props.overlay.tearDownOverlay();
  }

  render() {
    const { children, bindReference, show, offset } = this.props.overlay;
    return (
      <Fragment>
        {cloneElement(Children.only(children), {
          ref: bindReference
        })}

        <Transition
          from={{ opacity: 0, scale: 0.2 }}
          enter={{ opacity: 1, scale: 1 }}
          leave={{ opacity: 0, scale: 0.2 }}>
          {show
            ? ({ scale, opacity, offset }) => (
                <Popper scale={scale} opacity={opacity} offset={offset} />
              )
            : () => null}
        </Transition>
      </Fragment>
    );
  }
}
