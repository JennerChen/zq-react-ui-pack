import palx from "palx";

const palette = palx("#1890ff");

const flattened = Object.keys(palette).reduce((a, key) => {
  const value = palette[key];
  if (Array.isArray(value)) {
    a[key] = value[5];
    value.forEach((val, i) => {
      a[key + i] = val;
    });
  } else {
    a[key] = value;
  }
  return a;
}, {});

export const colors = Object.assign({}, flattened, {
  black: "#000",
  white: "#fff"
});

export default {
  colors,
  font: 'PingFangSC-light, "Microsoft YaHei", "SIMSUN"',
  weights: [400, 500, 700]
};
