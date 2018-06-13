import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "mobx-react";
import OverlayStore from "./OverlayStore";
import Manage from "./Manage";

export class Overlay extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    trigger: PropTypes.oneOf(["click", "hover"]),
    overlay: PropTypes.element.isRequired,
    placement: PropTypes.oneOf(["bottom", "top", "left", "right"]),
    offset: PropTypes.number,
    arrow: PropTypes.bool,
    arrowSize: PropTypes.number,
    arrowColor: PropTypes.string,
    autoClose: PropTypes.bool,
    hoverDelay: PropTypes.number,
    animation: PropTypes.bool,
    zIndex: function(props, propName, componentName) {
      if (props[propName] !== "auto" && !Number.isInteger(props[propName])) {
        return new Error(
          "Invalid prop `" +
            propName +
            "` supplied to" +
            " `" +
            componentName +
            "`. Validation failed. expect `auto` or a valid integer"
        );
      }
    },
    flip: PropTypes.bool
  };

  static defaultProps = {
    trigger: "click",
    placement: "bottom",
    offset: 8,
    arrow: false,
    arrowSize: 18,
    arrowColor: "#fff",
    autoClose: false,
    hoverDelay: 200,
    animation: false,
    zIndex: "auto",
    flip: true
  };

  constructor(props) {
    super(props);
    this.state = {
      overlay: new OverlayStore(this)
    };
  }

  render() {
    return (
      <Provider overlay={this.state.overlay}>
        <Manage />
      </Provider>
    );
  }
}
