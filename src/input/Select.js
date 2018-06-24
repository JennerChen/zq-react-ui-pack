import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { prop } from "styled-tools";
import { Overlay } from "../util/overlay";
import { withRipple } from "../util/decorators";
import styles from "../styles";
import { Flex, Item } from "../grid";
import { MDContainer, BaseSpan, OutlineLabel, BottomLine, HelpTextContainer } from "./BaseUI";

import { renderLeanIcon, renderTrailIcon } from "./BaseFn";

const OptionsContainer = styled(Flex).attrs({
  direction: "column"
})`
  background-color: #fff;
  padding: 8px 0;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
`;
const OptionContainer = withRipple(styled(Item).attrs({
  overflow: "100%"
})`
  color: ${styles.text.second};
  height: 30px;
  cursor: pointer;
  width: 100%;
  padding: 4px 8px;
  font-size: 12px;
  ${prop("selected", "#efefef")};
  &:hover {
    background-color: #efefef;
  }
`);

export default class MDSelect extends Component {
  static propTypes = {
    size: PropTypes.oneOf(["standard", "dense"]),
    mode: PropTypes.oneOf(["filled", "outlined"]),
    label: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    leanIcon: PropTypes.func,
    trailIcon: PropTypes.func,
    helpText: PropTypes.string,
    style: PropTypes.object,
    width: function(props, propName, componentName) {
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
    disabled: PropTypes.bool
  };

  static defaultProps = {
    size: "standard",
    mode: "filled",
    style: {},
    width: "auto"
  };

  state = {
    isFocus: false
  };

  handleSelect = option => {
    if (option.value !== this.props.value) {
      this.props.onChange(option.value, option);
    }
    this.overlay.getOverlayApi().closeOverlay();
  };

  isEmptyValue() {
    const { value } = this.props;
    if (typeof value === "undefined" || null === value) return true;
    if (typeof value === "string" && value === "") return true;
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
      allowClear,
      style,
      className,
      width,
      options,
      disabled
    } = this.props;
    const { isFocus } = this.state;
    let hasTrailIcon = allowClear ? allowClear : !!trailIcon;
    let hasLeanIcon = !!leanIcon;
    let displayLabel = "";
    let selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      displayLabel = selectedOption.label;
    }

    return (
      <MDContainer
        innerRef={container => (this.container = container)}
        className={className}
        size={size}
        mode={mode}
        focus={isFocus}
        disabled={disabled}
        style={style}>
        {leanIcon ? renderLeanIcon(this) : null}
        {hasTrailIcon ? renderTrailIcon(this) : null}
        <Overlay
          ref={overlay => (this.overlay = overlay)}
          animation={true}
          autoClose={true}
          offset={4}
          zIndex={8888}
          disabled={disabled}
          onVisibleChange={visible => {
            this.setState({
              isFocus: visible
            });
          }}
          overlay={() => (
            <OptionsContainer
              style={{
                width: width === "auto" ? this.container.getBoundingClientRect().width : width
              }}>
              {options.map(option => (
                <OptionContainer
                  key={option.value}
                  selected={option.value === value}
                  onClick={() => this.handleSelect(option)}
                  title={option.label}>
                  {option.label}
                </OptionContainer>
              ))}
            </OptionsContainer>
          )}>
          <BaseSpan
            disabled={disabled}
            size={size}
            leanIcon={hasLeanIcon}
            trailIcon={hasTrailIcon}
            onChange={this.handleOnChange}
            mode={mode}>
            {displayLabel}
          </BaseSpan>
        </Overlay>

        <OutlineLabel
          leanIcon={hasLeanIcon}
          trailIcon={hasTrailIcon}
          size={size}
          float={isFocus || !this.isEmptyValue()}
          focus={isFocus}
          disabled={disabled}
          mode={mode}>
          {label}
        </OutlineLabel>
        {mode === "filled" ? <BottomLine focus={isFocus} /> : null}

        <HelpTextContainer size={size} disabled={disabled}>
          {helpText}
        </HelpTextContainer>
      </MDContainer>
    );
  }
}
