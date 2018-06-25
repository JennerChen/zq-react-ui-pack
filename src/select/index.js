import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ArrowDropDown } from "styled-icons/material";
import { prop } from "styled-tools";
import { Flex, Item } from "../grid";
import styles from "../styles";
import { Overlay } from "../util/overlay";
import { withRipple } from "../util/decorators";

const SelectContainer = withRipple(styled(Flex).attrs({
  alignItems: "center",
  flex: "inline-flex"
})`
  cursor: pointer;
  height: 30px;
  background-color: #fff;
  min-width: 100px;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 0 22px 0 8px;
  font-size: 12px;
  transition: all 0.3s;
  color: ${styles.text.second};
  user-select: none;
  position: relative;
  &:hover {
    border-color: ${styles.primary};
    background-color: #efefef;
  }
`);

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

const StyledArrowDropDown = styled(ArrowDropDown).attrs({
  size: 16
})`
  position: absolute;
  right: 8px;
  top: 5px;
`;

export default class extends Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
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
    placeholder: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    width: "auto",
    placeholder: "请选择"
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  handleSelect = option => {
    if (option.value !== this.props.value) {
      this.props.onChange(option.value, option);
    }
    this.overlay.getOverlayApi().closeOverlay();
  };

  render() {
    const { value, options, placeholder, style, className, width } = this.props;
    let displayLabel = placeholder;
    let selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      displayLabel = selectedOption.label;
    }
    return (
      <Overlay
        ref={overlay => (this.overlay = overlay)}
        animation={true}
        autoClose={true}
        offset={0}
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
        <SelectContainer
          onClick={() => console.log(222)}
          className={className}
          innerRef={container => (this.container = container)}
          style={style}>
          <Item key={"content"} overflow={"100%"} title={displayLabel}>
            {displayLabel}
          </Item>
          <StyledArrowDropDown key={"arrow"} />
        </SelectContainer>
      </Overlay>
    );
  }
}
