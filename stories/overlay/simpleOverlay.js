import React, { Component } from "react";
import { utils, Flex, Item, flex, item, Button } from "../../src";
import styled from "styled-components";
const Overlay = utils.Overlay;

const CustomSpan = styled.span`
    color: red;
`;

const FlexRow = styled(Flex)`
  min-height: 100px;
  border: 1px solid gray;
`;

const FlexItem = styled(Item)`
    border: 1px solid green;
  text-align: center;
  margin: 5px;
`;

const AbsButton = styled(Button)`
    position: absolute;
    width: 100px;
`;

export default class extends Component {
  render() {
    return (
      <div>

        <FlexRow style={ { height: 100 } }>
          <FlexItem flex={1} >
            <Overlay
              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <CustomSpan>默认参数</CustomSpan>
            </Overlay>
          </FlexItem>


          <FlexItem flex={1} >
            <Overlay
              arrow={ true }
              arrowColor={ "#efefef" }
              animation={ true }
              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <CustomSpan>包含箭头与动画</CustomSpan>
            </Overlay>
          </FlexItem>

          <FlexItem flex={1} >
            <Overlay
              arrow={ true }
              arrowColor={ "#efefef" }
              animation={ true }
              autoClose={ true }
              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <CustomSpan>点击非弹层自动关闭</CustomSpan>
            </Overlay>
          </FlexItem>

          <FlexItem flex={1} >
            <Overlay
              arrow={ true }
              arrowColor={ "#efefef" }
              animation={ true }
              trigger={ "hover" }
              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <CustomSpan>鼠标移入显示</CustomSpan>
            </Overlay>
          </FlexItem>

          <FlexItem flex={1} alignSelf={ "flex-end" }>
            <Overlay
              arrow={ true }
              arrowColor={ "#efefef" }
              animation={ true }
              placement={ "top" }
              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <button style={ { width: 80 } }>覆盖问题</button>
            </Overlay>

            <Overlay
              arrow={ true }
              arrowColor={ "#efefef" }
              animation={ true }
              placement={ "top" }
              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <Button type={ "primary" } style={ { width: 80 } }>覆盖问题</Button>
            </Overlay>
          </FlexItem>
        </FlexRow>

        <div>

          <div style={ { position: "relative" } }>
            <Overlay
              arrow={ true }
              arrowColor={ "#efefef" }
              animation={ true }
              placement={ "top" }
              trigger={ "hover" }
              flip={ false }
              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <AbsButton style={ { top: 100, left: 300 } }>向上</AbsButton>
            </Overlay>


            <Overlay
              arrow={ true }
              arrowColor={ "#efefef" }
              animation={ true }
              placement={ "bottom" }
              trigger={ "hover" }
              flip={ false }

              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <AbsButton style={ { top: 200, left: 300, marginBottom: 200 } }>向下</AbsButton>
            </Overlay>


            <Overlay
              arrow={ true }
              arrowColor={ "#efefef" }
              animation={ true }
              placement={ "left" }
              trigger={ "hover" }
              flip={ false }

              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <AbsButton style={ { top: 150, left: 150, marginBottom: 200 } }>向左</AbsButton>
            </Overlay>

            <Overlay
              arrow={ true }
              arrowColor={ "#efefef" }
              animation={ true }
              placement={ "right" }
              trigger={ "hover" }
              flip={ false }

              overlay={
                <div style={{ width: 100, height: 50, backgroundColor: "#efefef" }}>这是弹出内容</div>
              }>
              <AbsButton style={ { top: 150, left: 450, marginBottom: 200 } }>向右</AbsButton>
            </Overlay>

          </div>

        </div>



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
