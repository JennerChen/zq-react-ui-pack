import React, { Component } from "react";
import { Button, Tooltip, Card, flex } from "../../src";
import styled from "styled-components";

const StyledCard = styled(Card)`
  ${flex({})};
`;

const StyledTooltip = styled(Tooltip)`
    padding: 30px;
`;
export default class Cards extends Component {
  state = {
    loading: true
  };

  render() {
    return (
      <div style={{ padding: 10 }}>
        <Tooltip title={ "这是按钮" }>
          <Button>Hello</Button>
        </Tooltip>


        <StyledTooltip title={ "ddd" }>
          <Button>Hello</Button>
        </StyledTooltip>


        <Tooltip placement={ "right" } title={ <span >向右</span> }>
          <Button>Hello</Button>
        </Tooltip>

      </div>
    );
  }
}
