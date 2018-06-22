import styled, { css } from "styled-components";
import { switchProp, ifProp } from "styled-tools";
import { Clear } from "styled-icons/material";
import { withRipple } from "../util";
import styles from "../styles";

export const StyledClearIcon = styled(Clear).attrs({
  size: 20,
  title: "清除"
})`
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: red;
  }
`;

export const MDContainer = styled.div`
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

export const LeanIcon = withRipple({
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

export const TrailIcon = withRipple({
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

export const BaseInput = styled.input`
  outline: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: 16px;
  border: none;
  transition: border-color 0.3s;
  border-radius: 5px;
  padding-top: ${switchProp("size", {
    standard: switchProp("mode", {
      filled: "20px",
      outlined: "6px"
    }),
    dense: switchProp("mode", {
      filled: "16px",
      outlined: "2px"
    })
  })};
  padding-left: ${ifProp("leanIcon", "40px", "12px")};
  padding-right: ${ifProp("trailIcon", "40px", "16px")};
  padding-bottom: 0;
`;

export const BaseSpan = styled(BaseInput.withComponent("div"))`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  line-height: ${switchProp("size", {
    standard: switchProp("mode", {
      filled: "30px",
      outlined: "48px"
    }),
    dense: switchProp("mode", {
      filled: "30px",
      outlined: "46px"
    })
  })};
`;

export const OutlineLabel = styled.span`
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
    "focus",
    css`
      color: ${styles.primary};
    `,
    css`
      color: ${styles.text.third};
    `
  )};
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
    `,
    css``
  )};
`;

export const BottomLine = styled.div`
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

export const HelpTextContainer = styled.div`
  position: absolute;
  top: ${switchProp("size", {
    standard: "58px",
    dense: "50px"
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
