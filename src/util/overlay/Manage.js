import React, { Component, Fragment, Children, cloneElement } from "react";
import { inject, observer } from "mobx-react";
import PopperAnimateWrapper from "./PopperAnimateWrapper";

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
    const { children, bindReference, disabled } = this.props.overlay;
    return (
      <Fragment>
        {cloneElement(Children.only(children), {
          ref: bindReference
        })}
        {disabled ? null : <PopperAnimateWrapper />}
      </Fragment>
    );
  }
}
