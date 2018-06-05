import React, { Component } from "react";
import PropTypes from "prop-types";
import { action } from "@storybook/addon-actions";
//import { Divider } from "rebass";
import { Button, utils, Card }  from "../../src";
import { ArrowDropDownCircle } from "styled-icons/material"
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
        <ArrowDropDownCircle size={ 24 }/>
        <Card rippleColor={ "pink" }><i className={ "iconfont" }>&#xe78c;</i></Card>
        {/*<Button onClick={action("clicked")}>基础按钮</Button>*/}

        {/*<Button onClick={action("clicked")} disabled={true}>*/}
          {/*按钮不可用*/}
        {/*</Button>*/}

        <Button onClick={req}
                tagName={ "a" }
                style={ { height: 40 } }
                disabled
        >点击之后加载中</Button>

        <Button onClick={req}
                shape={ "circle" }
                type={ "revert" }
        ><ArrowDropDownCircle size={ 30 }/></Button>

        <Button onClick={req} shape={ "circle" } type={ "primary" } style={ { margin: "0 5px" } }>点击之后加载中</Button>
        {/*<div>尺寸</div>*/}
        {/*<Button onClick={action("clicked")} fontSize={30}>*/}
          {/*/!*<Loading size={30} mr={1} color={"#fff"} />*!/*/}
          {/*加载中*/}
        {/*</Button>*/}
      </div>
    );
  }
}
