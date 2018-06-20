import React, { Component } from "react";
import PropTypes from "prop-types";
import { action } from "@storybook/addon-actions";
import { Checkbox } from "../../src";

const makePromise = fn => {
  return val => {
    let p = new Promise(resolve => {
      setTimeout(() => resolve(fn.apply(this, [val])), 1000);
    });
    return p;
  };
};
export default class extends Component {
  state = {
    check1: false,
    check2: true,
    check3: false
  };

  render() {
    const { check1, check2, check3 } = this.state;
    return (
      <div>
        <Checkbox
          checked={check1}
          onChange={val =>
            this.setState({
              check1: val
            })
          }>
          选中我
        </Checkbox>

        <Checkbox
          disabled={true}
          checked={check2}
          onChange={val =>
            this.setState({
              check1: val
            })
          }>
          选中我
        </Checkbox>

        <Checkbox
          checked={check3}
          onChange={makePromise(val =>
            this.setState({
              check3: val
            })
          )}>
          包含异步加载功能
        </Checkbox>
      </div>
    );
  }
}
