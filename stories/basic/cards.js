import React, { Component } from "react";
import { Button, utils, Card, flex } from "../../src";
import styled from "styled-components";
import { ArrowDropDownCircle, VerticalAlignTop } from "styled-icons/material";
function req() {
  return new Promise(res => {
    setTimeout(res, 2000);
  });
}

const StyledCard = styled(Card)`
  ${flex({})};
`;

export default class Cards extends Component {
  state = {
    loading: true
  };

  render() {
    return (
      <div style={{ padding: 10 }}>

        <StyledCard
          style={{ width: 200, height: 100 }}>
          <p>普通显示内容</p>
        </StyledCard>

        <StyledCard
          keepContent={ true }
          loading={this.state.loading}
          style={{ width: 200, height: 100 }}>
          <p>Spin 方式加载, 并且保持内容显示</p>
        </StyledCard>

        <StyledCard
          loadingTemplate={ "list" }
          loading={this.state.loading}
          style={{ width: 600, height: 400 }}
        >
          <p>List 加载方式</p>
        </StyledCard>

        <Button
          onClick={() =>
            this.setState({
              loading: !this.state.loading
            })
          }>
          toggle
        </Button>
      </div>
    );
  }
}
