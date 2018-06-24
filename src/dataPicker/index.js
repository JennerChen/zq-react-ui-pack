import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Provider } from "mobx-react";
import { lighten } from "polished";
import { Flex } from "../grid";
import styles from "../styles";
import DatePickerStore from "./DatePickerStore";
import SelectedTimeContainer from "./SelectTimeContainer";
import DateList from "./DateList";
import { getScrollbarWidth } from "../util";

const Container = styled(Flex).attrs({
  flex: "inline-flex",
  direction: "column"
})``;

const WeekList = styled(Flex)`
  background-color: ${lighten(0.2, styles.primary)};
`;

const WeekDiv = styled.div`
  width: 40px;
  height: 30px;
  text-align: center;
  background-color: ${lighten(0.2, styles.primary)};
  color: #fff;
  font-size: 14px;
  line-height: 30px;
`;

export default class extends Component {
  static propTypes = {
    from: PropTypes.string,
    to: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    from: "2015-01-01",
    to: "2020-12-31"
  };

  constructor(props) {
    super(props);
    this.state = {
      store: new DatePickerStore(this.props)
    };
  }

  render() {
    const { store } = this.state;
    return (
      <Provider store={store}>
        <Container>
          <SelectedTimeContainer />
          <WeekList style={{ width: 280 + getScrollbarWidth() }}>
            <WeekDiv>周日</WeekDiv>
            <WeekDiv>周一</WeekDiv>
            <WeekDiv>周二</WeekDiv>
            <WeekDiv>周三</WeekDiv>
            <WeekDiv>周四</WeekDiv>
            <WeekDiv>周五</WeekDiv>
            <WeekDiv>周六</WeekDiv>
          </WeekList>
          <DateList />
        </Container>
      </Provider>
    );
  }
}
