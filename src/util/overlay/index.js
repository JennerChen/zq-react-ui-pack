import React, { Component, Fragment, Children } from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";
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
    hoverDelay: PropTypes.number
  };

  static defaultProps = {
    trigger: "click",
    placement: "bottom",
    offset: 8,
    arrow: false,
    arrowSize: 18,
    arrowColor: "#fff",
    autoClose: false,
    hoverDelay: 200
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
