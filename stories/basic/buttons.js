import React, { Component } from "react";
import PropTypes from "prop-types";
import { action } from "@storybook/addon-actions";
//import { Divider } from "rebass";
import { Button, utils, Card }  from "../../src";

function req() {
  return new Promise(res => {
    setTimeout(res, 2000);
  });
}

@utils.portal
export default class Buttons extends Component {
  render() {
    return (
      <div>
        <Card rippleColor={ "pink" }>Hello</Card>
        {/*<Button onClick={action("clicked")}>基础按钮</Button>*/}

        {/*<Button onClick={action("clicked")} disabled={true}>*/}
          {/*按钮不可用*/}
        {/*</Button>*/}

        <Button onClick={req}>点击之后加载中</Button>
        <Button onClick={req} type={ "primary" } style={ { margin: "0 5px" } }>点击之后加载中</Button>
        {/*<div>尺寸</div>*/}
        {/*<Button onClick={action("clicked")} fontSize={30}>*/}
          {/*/!*<Loading size={30} mr={1} color={"#fff"} />*!/*/}
          {/*加载中*/}
        {/*</Button>*/}
      </div>
    );
  }
}
