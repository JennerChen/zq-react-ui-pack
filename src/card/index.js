import React, { Component } from "react";
import { withRipple } from "../util";

@withRipple
export default class extends Component {
  render() {
    console.log(this.props);

    return <div style={{ backgroundColor: "#efefef", width: 100, height: 100 }} {...this.props} />;
  }
}
