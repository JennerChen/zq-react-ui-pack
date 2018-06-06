import styled, { css } from "styled-components";
import styles from "../styles";
import { switchProp, ifProp } from "styled-tools";
import { darken } from "polished";

export const BaseBtn = styled.button`
  border: none;
  position: relative;
  font-size: 12px;
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  outline: none;

  height: 30px;
  line-height: 30px;

  transition: all 0.3s;
  ${switchProp("shape", {
    circle: css`
      border-radius: 50%;
      width: 30px;
      padding: 0;
    `,
    default: css`
      border-radius: 4px;
      padding: 0 16px;
    `
  })};
  ${switchProp("type", {
    default: css`
      background-color: #fff;
      color: ${styles.text.second};
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    `,
    primary: css`
      background-color: ${styles.primary};
      color: #fff;
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    `,
    revert: css`
      background-color: transparent;
      color: ${styles.text.second};
    `
  })};

  ${ifProp(
    "disabled",
    css`
      opacity: 0.6;
      cursor: default;
    `,
    css`
      &:hover {
        ${switchProp("type", {
          default: css`
            background-color: ${darken(0.1, "#fff")};
            color: ${darken(0.1, styles.text.second)};
          `,
          primary: css`
            background-color: ${darken(0.1, styles.primary)};
          `
        })};
      }
    `
  )};
`;

export const LinkBtn = styled(BaseBtn.withComponent("a"))`
  line-height: 30px;
`;
