import React, { Component } from "react";
import PropTypes from "prop-types";
import { MDContainer, BaseInput, OutlineLabel, BottomLine, HelpTextContainer } from "./BaseUI";
import { renderLeanIcon, renderTrailIcon } from "./BaseFn";

class MDInput extends Component {
  static propTypes = {
    size: PropTypes.oneOf(["standard", "dense"]),
    mode: PropTypes.oneOf(["filled", "outlined"]),
    type: PropTypes.oneOf(["text", "password"]),
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    leanIcon: PropTypes.func,
    trailIcon: PropTypes.func,
    helpText: PropTypes.string,
    allowClear: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    size: "standard",
    mode: "filled",
    allowClear: false,
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocus: false
    };
  }

  focusInput = () => {
    this.setState({
      isFocus: true
    });
  };

  blurInput = () => {
    this.setState({
      isFocus: false
    });
  };

  handleOnChange = e => {
    this.props.onChange(e.target.value);
  };

  emptyValue = () => {
    if (!this.props.value) return;
    this.props.onChange("");
  };

  render() {
    const {
      size,
      mode,
      label,
      value,
      leanIcon,
      trailIcon,
      helpText,
      allowClear,
      style,
      type,
      className
    } = this.props;
    const { isFocus } = this.state;
    let hasTrailIcon = allowClear ? allowClear : !!trailIcon;
    let hasLeanIcon = !!leanIcon;
    let inputElement = null;

    switch (type) {
      case "text":
      case "password":
      default:
        inputElement = (
          <BaseInput
            type={type}
            size={size}
            leanIcon={hasLeanIcon}
            trailIcon={hasTrailIcon}
            onFocus={this.focusInput}
            onBlur={this.blurInput}
            onChange={this.handleOnChange}
            value={value}
            mode={mode}
          />
        );
    }

    return (
      <MDContainer className={className} size={size} mode={mode} focus={isFocus} style={style}>
        {leanIcon ? renderLeanIcon(this) : null}
        {hasTrailIcon ? renderTrailIcon(this) : null}
        {inputElement}
        <OutlineLabel
          leanIcon={hasLeanIcon}
          trailIcon={hasTrailIcon}
          size={size}
          float={isFocus || !!value}
          mode={mode}
          focus={isFocus}>
          {label}
        </OutlineLabel>
        {mode === "filled" ? <BottomLine focus={isFocus} /> : null}

        <HelpTextContainer size={size}>{helpText}</HelpTextContainer>
      </MDContainer>
    );
  }
}

export default MDInput;
