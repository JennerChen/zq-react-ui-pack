import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import { Flex } from "../grid";
import styles from "../styles";

const SelectTimeContainer = styled(Flex).attrs({
  direction: "column"
})`
  padding: 10px 20px;
  background-color: ${styles.primary};
`;

const CurrentYear = styled.div`
  font-size: 14px;
  color: #fff;
  height: 16px;
  margin-bottom: 5px;
`;

const CurrentTime = styled.div`
  font-size: 20px;
  color: #fff;
`;

@inject("store")
@observer
export default class extends Component {
  render() {
    return (
      <SelectTimeContainer>
        <CurrentYear>2018</CurrentYear>
        <CurrentTime>6月 23日, 周六</CurrentTime>
      </SelectTimeContainer>
    );
  }
}
