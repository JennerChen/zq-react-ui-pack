import React, { Component } from "react";
import { utils } from "../../src";

const Overlay = utils.Overlay;

export default class extends Component {
  render() {
    return (
      <div>

        <Overlay
          arrow={ true }
          arrowColor={ "#efefef" }
          autoClose={ true }
          overlay={
            <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
          }>
          <span>我要测试</span>
        </Overlay>


        {/*<Overlay*/}
          {/*arrow={ true }*/}
          {/*arrowColor={ "#333" }*/}
          {/*trigger={ "hover" }*/}
          {/*overlay={*/}
            {/*<div style={{ width: 100, height: 50, backgroundColor: "#333",color: "#fff" }}>这是弹出内容</div>*/}
          {/*}>*/}
          {/*<span style={ { position:"absolute",left: 100, top: 100 } }>我要测试</span>*/}
        {/*</Overlay>*/}
      </div>
    );
  }
}
