import React, { Component, Fragment, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import Radio from "./Radio";

export default class extends Component {
  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.any.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        disabled: PropTypes.bool
      })
    ),
    onChange: PropTypes.func.isRequired,
    children: PropTypes.array
  };

  static defaultProps = {
    options: []
  };

  handleOnChange = value => {
    const { children, options } = this.props;
    let selectedOption = null;
    if (!children) {
      selectedOption = options.find(option => option.value === value);
    }

    this.props.onChange(value, selectedOption);
  };

  render() {
    const { children, options, value } = this.props;
    return (
      <Fragment>
        {children
          ? Children.map(children, child =>
              cloneElement(child, {
                onChange: this.handleOnChange,
                checked: value === child.props.value
              })
            )
          : options.map(option => (
              <Radio
                key={option.value}
                value={option.value}
                onChange={this.handleOnChange}
                disabled={option.disabled}
                checked={option.value === value}>
                {option.label}
              </Radio>
            ))}
      </Fragment>
    );
  }
}
