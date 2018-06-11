import styled from "styled-components";
import { prop } from "styled-tools";

export default styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  &[data-placement*="bottom"] {
    top: 0;
    left: 0;
    margin-top: -6px;
    width: 18px;
    height: 6px;
    &::before {
      border-width: 0 9px 6px 9px;
      border-color: transparent transparent ${prop("bg", "#fff")} transparent;
    }
  }
  &[data-placement*="top"] {
    bottom: 0;
    left: 0;
    margin-bottom: -0.9em;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 1em 1.5em 0 1.5em;
      border-color: ${prop("bg", "#fff")} transparent transparent transparent;
    }
  }
  &[data-placement*="right"] {
    left: 0;
    margin-left: -0.9em;
    height: 3em;
    width: 1em;
    &::before {
      border-width: 1.5em 1em 1.5em 0;
      border-color: transparent ${prop("bg", "#fff")} transparent transparent;
    }
  }
  &[data-placement*="left"] {
    right: 0;
    margin-right: -0.9em;
    height: 3em;
    width: 1em;
    &::before {
      border-width: 1.5em 0 1.5em 1em;
      border-color: transparent transparent transparent ${prop("bg", "#fff")};
    }
  }
  &::before {
    content: "";
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
`;
