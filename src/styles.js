import { lighten } from "polished";

const textColor = "#333";

export default {
  primary: "#26a69a",
  second: "#e10050",
  text: {
    primary: textColor,
    second: lighten(0.2, textColor),
    third: lighten(0.4, textColor)
  },
  disabled: lighten(0.6, textColor)
};
