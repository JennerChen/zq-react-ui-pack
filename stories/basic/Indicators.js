import React, { Component } from "react";
import PropTypes from "prop-types";
import { action } from "@storybook/addon-actions";
import { Spin } from "../../src";
import { ArrowDropDownCircle, VerticalAlignTop } from "styled-icons/material";


export default class Buttons extends Component {
  render() {
    return (
      <div>
        <Spin/>

        <Spin size={ 32 }/>

        <Spin size={ 48 }/>
      </div>
    );
  }
}
