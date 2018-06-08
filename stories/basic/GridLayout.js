import React, { Component } from "react";
import { Flex, Item, flex, item } from "../../src";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
const FlexRow = styled(Flex)`
  min-height: 100px;
  border: 1px solid gray;
`;

const FlexItem = styled(Item)`
  background-color: #efefef;
  text-align: center;
  margin: 5px;
  min-height: 50px;
`;

const Divider = styled.div`
  height: 10px;
`;

export default class extends Component {
  render() {
    return (
      <div>
        布局, 使用 flex布局
        <FlexRow>
          <Tooltip title={ "123" }>
            <FlexItem flex={1} />
          </Tooltip>


          <FlexItem flex={1} />

          <FlexItem flex={1} />

          <FlexItem flex={1} />

          <FlexItem flex={1} />
        </FlexRow>
        <Divider />
        <p>垂直</p>
        <FlexRow direction={"column"}>
          <FlexItem />
          <FlexItem />
          <FlexItem />
          <FlexItem />
          <FlexItem />
        </FlexRow>
        <Divider />
        <p>混合, 一种较为常见的页面布局, 两边固定宽度，中间部分随页面宽度适配</p>
        <FlexRow wrap={"wrap"}>
          <FlexItem style={{ width: "100%" }} />
          <FlexItem style={{ width: 200, height: 200 }} />
          <FlexItem flex={1} />
          <FlexItem style={{ width: 400, height: 200 }} />

          <FlexItem style={{ width: "100%" }} />
        </FlexRow>

        <p>居中</p>
        <FlexRow
          alignItems={ "center" }
          justifyContent={ "center" }
        >
          <p>我是文本
          <br/>
            多行文本
          </p>
        </FlexRow>
      </div>
    );
  }
}
