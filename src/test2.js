import React, { Component, Fragment } from "react";
import { name } from "../package.json";

const dec = function(Comp) {
  return class {
    render() {
      return (
        <Fragment>
          <div>i am decoratored</div>
          <Comp />
        </Fragment>
      );
    }
  };
};

@dec
class ABC extends Component {
  render() {
    return <div>hello world</div>;
  }
}

ABC.name = name;
//console.log("abc", React, Fragment, Component, Div, cleanProp)

//cleanProp(["abc"]);
export default ABC;

export { default as DIV } from "./test";
