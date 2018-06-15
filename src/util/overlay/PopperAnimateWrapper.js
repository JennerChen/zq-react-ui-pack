import React, { Fragment, Component } from "react";
import { inject, observer } from "mobx-react";
import { Transition, config } from "react-spring";
import Popper from "./Popper";

@inject("overlay")
@observer
export default class extends Component {
  render() {
    const { show, animation } = this.props.overlay;
    return (
      <Fragment>
        {animation ? (
          <Transition
            from={{ opacity: 0, scale: 0.2 }}
            enter={{ opacity: 1, scale: 1 }}
            leave={{ opacity: 0, scale: 0.2 }}
            config={config.wobbly}>
            {show ? ({ scale, opacity }) => <Popper scale={scale} opacity={opacity} /> : () => null}
          </Transition>
        ) : show ? (
          <Popper scale={1} opacity={1} />
        ) : null}
      </Fragment>
    );
  }
}
