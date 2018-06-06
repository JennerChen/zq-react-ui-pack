import ellipsis from "./util/ellipsis";

export default ({
  flex = "flex",
  direction = "row",
  wrap = "nowrap",
  justifyContent = "flex-start",
  alignItems = "stretch",
  alignContent = "stretch",
  overflow = false
} = {}) => `
    ${overflow ? ellipsis(overflow) : ""};
    display: ${flex};
    flex-flow: ${direction} ${wrap};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    align-content: ${alignContent};
`;
