import React, { Component, createElement } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { RadioButtonChecked, RadioButtonUnchecked } from "styled-icons/material";
import { ifProp, prop } from "styled-tools";
import styles from "../styles";
import { Spin } from "../indicator";
import { withRipple } from "../util/decorators";
import { Flex } from "../grid";
const Container = styled(Flex).attrs({
  flex: "inline-flex",
  alignItems: "center"
})`
  position: relative;
  text-align: left;
  vertical-align: middle;
  color: ${styles.text.primary};
  cursor: pointer;
  ${ifProp(
    "disabled",
    css`
      color: ${styles.disabled};
      cursor: default;
      user-select: none;
      pointer-events: none;
    `
  )};
`;

const IconContainer = withRipple(styled.div`
  padding: ${prop("size", 8)}px;
  display: inline-block;
`);

const RadioLabel = styled.span``;

const InputRadio = styled.input.attrs({
  type: "radio"
})`
  outline: 0;
  visibility: hidden;
  width: 0;
  height: 0;
`;

class Radio extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.number,
    rippleSize: PropTypes.number,
    style: PropTypes.object,
    value: PropTypes.any.isRequired
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    size: 24,
    rippleSize: 8,
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSelectRadio = () => {
    if (this.props.checked) return;
    let result = this.props.onChange(this.props.value);

    if (result instanceof Promise) {
      this.setState({
        loading: true
      });
      result.finally(() => {
        this.setState({
          loading: false
        });
      });
    }
  };

  render() {
    const { loading } = this.state;
    const { children, checked, disabled, size, rippleSize, style, className } = this.props;
    const isDisabled = loading ? true : disabled;
    const iconColor = isDisabled ? styles.disabled : checked ? styles.primary : styles.text.primary;
    return (
      <Container
        className={className}
        onClick={this.handleSelectRadio}
        disabled={isDisabled}
        style={style}>
        <InputRadio checked={checked} disabled={disabled} onChange={() => {}} />
        <IconContainer
          size={rippleSize}
          rippleColor={iconColor}
          rippleShape={"circle"}
          rippleEffect={"center"}>
          {createElement(loading ? Spin : checked ? RadioButtonChecked : RadioButtonUnchecked, {
            color: iconColor,
            size: size
          })}
        </IconContainer>

        <RadioLabel>{children}</RadioLabel>
      </Container>
    );
  }
}

export default Radio;
