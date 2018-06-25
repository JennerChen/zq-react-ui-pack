import styled, { css } from "styled-components";
import { ifProp, switchProp } from "styled-tools";
import { Flex } from "../grid";
import styles from "../styles";
import { withRipple } from "../util";

export const TimeInner = styled(
  withRipple({
    allowRipple: true,
    rippleEffect: "center",
    rippleShape: "circle",
    rippleColor: styles.primary
  })(Flex)
).attrs({
  flex: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  direction: "column"
})`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid transparent;
  font-size: 12px;
  ${ifProp(
    "highlight",
    css`
      background-color: ${styles.primary} !important;
      color: #fff;
    `
  )};

  ${ifProp(
    "today",
    css`
      border-color: ${styles.primary};
    `
  )};
`;

export const TimeColumn = styled(Flex).attrs({
  flex: "inline-flex",
  justifyContent: "center",
  alignItems: "center"
})`
  user-select: none;
  width: 40px;
  height: 40px;
  position: relative;
  &:hover {
    & ${TimeInner} {
      background-color: #efefef;
    }
  }

  ${ifProp(
    "disabled",
    css`
      color: ${styles.disabled};

      pointer-events: none;
    `
  )};

  ${ifProp(
    "showTopBorder",
    css`
      border-top: 1px solid #e2dfdf;
    `
  )};

  ${ifProp(
    "showLeftBorder",
    css`
      border-left: 1px solid #e2dfdf;
    `
  )};
`;

export const TimeMention = styled.div`
  font-size: 12px;

  line-height: initial;
  transform: scale(0.8);
  height: 14px;
  white-space: nowrap;
  word-wrap: normal;
  ${switchProp("color", {
    red: css`
      color: red;
      ${ifProp(
        "highlight",
        css`
          color: #fff;
        `
      )};
    `,
    gray: css`
      color: ${styles.text.third};
      ${ifProp(
        "highlight",
        css`
          color: #fff;
        `
      )};
    `
  })};
`;
