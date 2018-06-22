import React, { Component, createElement, cloneElement } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { switchProp, ifProp } from "styled-tools";
import { Clear } from "styled-icons/material";
import { withRipple } from "../util";
import styles from "../styles";

const StyledClearIcon = styled(Clear).attrs({
  size: 20,
  title: "清除"
})`
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: red;
  }
`;

const Container = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: inline-block;
  vertical-align: bottom;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 20px;
  height: ${switchProp("size", {
    standard: 56,
    dense: 48
  })}px;
  ${switchProp("mode", {
    filled: css`
      background-color: #f5f5f5;
      &:hover {
        border-bottom-color: rgba(0, 0, 0, 0.3);
        background-color: #eeedee;
      }
    `,
    outlined: css`
      border-radius: 5px;
      background-color: transparent;

      ${ifProp(
        "focus",
        css`
          box-shadow: 0 0 1px 1px ${styles.primary};
          border: 1px solid ${styles.primary};
        `,
        css`
          border: 1px solid rgba(0, 0, 0, 0.12);
          &:hover {
            border-color: rgba(0, 0, 0, 0.3);
          }
        `
      )};
    `
  })};

  ${StyledClearIcon} {
    transform: scale(0);
  }

  &:hover {
    ${StyledClearIcon} {
      transform: scale(1);
    }
  }
`;

const LeanIcon = withRipple({
  allowRipple: false,
  rippleShape: "circle",
  rippleEffect: "center",
  rippleColor: styles.primary
})(styled.span`
  position: absolute !important;
  width: 24px;
  height: 24px;
  overflow: hidden;
  z-index: 1;
  color: ${styles.text.third};
  text-align: center;
  ${switchProp("size", {
    standard: css`
      left: 12px;
      top: 18px;
    `,
    dense: css`
      left: 12px;
      top: 14px;
    `
  })};
`);

const TrailIcon = withRipple({
  allowRipple: false,
  rippleShape: "circle",
  rippleEffect: "center",
  rippleColor: styles.primary
})(styled.span`
  position: absolute !important;
  width: 24px;
  height: 24px;
  overflow: hidden;
  z-index: 1;
  color: ${styles.text.third};
  text-align: center;

  ${switchProp("size", {
    standard: css`
      right: 12px;
      top: 18px;
    `,
    dense: css`
      right: 12px;
      top: 14px;
    `
  })};
`);

const Input = styled.input`
  outline: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: 16px;
  border: none;
  transition: border-color 0.3s;
  border-radius: 5px;
  padding: ${css`
    ${switchProp("size", {
      standard: switchProp("mode", {
        filled: "20px",
        outlined: "6px"
      }),
      dense: switchProp("mode", {
        filled: "16px",
        outlined: "2px"
      })
    })} 
  ${ifProp("trailIcon", "36px", "12px")} 
  0 
  ${ifProp("leanIcon", "40px", "16px")}
`};
`;

const OutlineLabel = styled.span`
  position: absolute;

  font-size: 18px;

  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  overflow: hidden;
  z-index: 5;
  will-change: transform, color, left;
  font-weight: 400;
  display: inline-block;

  line-height: 18px;
  transition: transform 0.3s, left 0.3s ease-in-out;
  transform-origin: left;
  width: calc(100% - 16px - 12px - ${ifProp("leanIcon", "24px", "0px")});
  left: ${ifProp("leanIcon", "40px", "16px")};
  ${switchProp("size", {
    standard: css`
      top: 18px;
    `,
    dense: css`
      top: 14px;
    `
  })};
  ${ifProp(
    "float",
    css`
      ${switchProp("mode", {
        filled: css`
          transform: translateY(-50%) scale(0.75);
        `,
        outlined: css`
          padding-left: 4px;
          padding-right: 4px;
          width: auto;
          max-width: calc(100% - 24px);
          background-color: #fff;
          left: 12px;
          z-index: 10;
          transform: translateY(
              ${switchProp("size", {
                standard: "-29px",
                dense: "-25px"
              })}
            )
            scale(0.75);
        `
      })};

      color: ${styles.primary};
    `,
    css`
      color: ${styles.text.third};
    `
  )};
`;

const BottomLine = styled.div`
  height: 2px;
  position: absolute;
  bottom: -1px;
  z-index: 2;
  left: 50%;
  will-change: width;
  transform: translateX(-50%);
  background-color: transparent;
  transition: all 0.3s ease-in-out;
  transform-origin: center;
  ${ifProp(
    "focus",
    css`
      width: 100%;
      background-color: ${styles.primary};
    `,
    css`
      width: 0;
      background-color: transparent;
    `
  )};
`;

const HelpTextContainer = styled.div`
  position: absolute;
  top: ${switchProp("size", {
    standard: "58px",
    dense: "48px"
  })};
  left: 0;
  width: 100%;
  color: ${styles.text.third};
  font-size: 12px;
  line-height: 16px;
  padding-left: 12px;
  padding-right: 12px;
  pointer-events: none;
`;

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
      style
    } = this.props;
    const { isFocus } = this.state;
    let hasTrailIcon = clearIcon ? clearIcon : !!trailIcon;
    let hasLeanIcon = !!leanIcon;

    return (
      <Container size={size} mode={mode} focus={isFocus} style={style}>
        {leanIcon ? this.renderLeanIcon() : null}
        {hasTrailIcon ? this.renderTrailIcon() : null}
        <Input
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
          mode={mode}>
          {label}
        </OutlineLabel>
        {mode === "filled" ? <BottomLine focus={isFocus} /> : null}

        <HelpTextContainer size={size}>{helpText}</HelpTextContainer>
      </Container>
    );
  }
}
MDInput.TrailIcon = TrailIcon;
MDInput.LeanIcon = LeanIcon;
export default MDInput;
