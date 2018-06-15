import styled, { css } from "styled-components";
import { prop, switchProp } from "styled-tools";

const getSizeProp = (defaultValue, divider = 1) => props =>
  (props.size ? props.size : defaultValue) / divider;

export default styled.div`
  width: ${getSizeProp(18)}px;
  height: ${getSizeProp(18)}px;
  position: absolute;
  ${switchProp("placement", {
    bottom: css`
      top: 0;
      left: 0;
      margin-top: -${getSizeProp(18, 3)}px;
      width: ${getSizeProp(18)}px;
      height: ${getSizeProp(18, 3)}px;
      &::before {
        border-width: 0 ${getSizeProp(18, 2)}px ${getSizeProp(18, 3)}px ${getSizeProp(18, 2)}px;
        border-color: transparent transparent ${prop("bg", "#fff")} transparent;
      }
    `,
    top: css`
      bottom: 0;
      left: 0;
      margin-bottom: -${getSizeProp(18, 3)}px;
      width: ${getSizeProp(18)}px;
      height: ${getSizeProp(18, 3)}px;
      &::before {
        border-width: ${getSizeProp(18, 3)}px ${getSizeProp(18, 2)}px 0 ${getSizeProp(18, 2)}px;
        border-color: ${prop("bg", "#fff")} transparent transparent transparent;
      }
    `,
    left: css`
      right: 0;
      margin-right: -${getSizeProp(18, 3)}px;
      width: ${getSizeProp(18, 3)}px;
      height: ${getSizeProp(18)}px;
      &::before {
        border-width: ${getSizeProp(18, 2)}px 0 ${getSizeProp(18, 2)}px ${getSizeProp(18, 3)}px;
        border-color: transparent transparent transparent ${prop("bg", "#fff")};
      }
    `,
    right: css`
      left: 0;
      margin-left: -${getSizeProp(18, 3)}px;
      width: ${getSizeProp(18, 3)}px;
      height: ${getSizeProp(18)}px;
      &::before {
        border-width: ${getSizeProp(18, 2)}px ${getSizeProp(18, 3)}px ${getSizeProp(18, 2)}px 0;
        border-color: transparent ${prop("bg", "#fff")} transparent transparent;
      }
    `
  })};

  &::before {
    content: "";
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
`;
