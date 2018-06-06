import ellipsis from "./util/ellipsis";

export default ({
  order = 0,
  flex,
  grow = 0,
  shrink = 1,
  basis = "auto",
  alignSelf = "auto",
  overflow = false
} = {}) => {
  let flexAttr = flex ? flex : `${grow} ${shrink} ${basis}`;
  return `
        ${overflow ? ellipsis(overflow) : ""};
        order:${order};
        flex: ${flexAttr};
        align-self: ${alignSelf};
    `;
};
