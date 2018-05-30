import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "rebass";

import theme, { colors } from "./theme";

export default class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.object
  };

  static defaultProps = {
    theme: {}
  };

  render() {
    return (
      <Provider
        theme={{
          ...theme,
          ...this.props.theme
        }}>
        {this.props.children}
      </Provider>
    );
  }
}
