import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import {
  StyledClearIcon,
  MDContainer,
  LeanIcon,
  TrailIcon,
  BaseInput,
  OutlineLabel,
  BottomLine,
  HelpTextContainer
} from "./BaseUI";

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
    clearIcon: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    size: "standard",
    mode: "filled",
    clearIcon: false,
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

  renderLeanIcon() {
    const { size, leanIcon } = this.props;

    return cloneElement(leanIcon(LeanIcon), {
      size
    });
  }

  renderTrailIcon() {
    const { size, trailIcon, clearIcon, value } = this.props;

    let trailIconComp = clearIcon ? (
      value ? (
        <TrailIcon allowRipple={!!value} onClick={this.emptyValue}>
          <StyledClearIcon size={20} />
        </TrailIcon>
      ) : null
    ) : (
      trailIcon(TrailIcon)
    );

    if (!trailIconComp) {
      return null;
    }

    return cloneElement(trailIconComp, {
      size
    });
  }
  render() {
    const {
      size,
      mode,
      label,
      value,
      leanIcon,
      trailIcon,
      helpText,
      clearIcon,
      style,
      type
    } = this.props;
    const { isFocus } = this.state;
    let hasTrailIcon = clearIcon ? clearIcon : !!trailIcon;
    let hasLeanIcon = !!leanIcon;

    return (
      <MDContainer size={size} mode={mode} focus={isFocus} style={style}>
        {leanIcon ? this.renderLeanIcon() : null}
        {hasTrailIcon ? this.renderTrailIcon() : null}
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
MDInput.TrailIcon = TrailIcon;
MDInput.LeanIcon = LeanIcon;
export default MDInput;
