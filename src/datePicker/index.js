import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Provider, Observer } from "mobx-react";
import { lighten } from "polished";
import { Transition, animated } from "react-spring";
import { Flex } from "../grid";
import styles from "../styles";
import DatePickerStore from "./DatePickerStore";
import SelectedTimeContainer from "./SelectTimeContainer";
import DateList from "./DateList";
import { getScrollbarWidth } from "../util";
import YearMonthList from "./YearMonthList";

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

const ListContainer = styled.div`
  height: 200px;
  position: relative;
  overflow: auto;

  & .ReactVirtualized__Grid {
    outline: none;
  }
`;

export default class extends PureComponent {
  static propTypes = {
    from: PropTypes.string,
    to: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    height: PropTypes.number,
    disabledDate: PropTypes.func
  };

  static defaultProps = {
    from: "2001-01-01",
    to: "2030-12-31",
    disabledDate: () => false
  };

  state = {};

  static getDerivedStateFromProps(props, state) {
    if (!state.store) {
      return {
        store: new DatePickerStore(props)
      };
    }

    if (props !== state.store.pickerProps) {
      state.store.updatePickerProps(props);
    }

    return null;
  }

  getDatePickerApi() {
    return this.state.store;
  }

  render() {
    const { store } = this.state;

    return (
      <Provider store={store}>
        <Container>
          <SelectedTimeContainer />
          <WeekList style={{ width: 280 + getScrollbarWidth() }}>
            <WeekDiv onClick={() => store.scrollToTargetPos(store.selectedDay)}>周日</WeekDiv>
            <WeekDiv>周一</WeekDiv>
            <WeekDiv>周二</WeekDiv>
            <WeekDiv>周三</WeekDiv>
            <WeekDiv>周四</WeekDiv>
            <WeekDiv>周五</WeekDiv>
            <WeekDiv>周六</WeekDiv>
          </WeekList>
          <Observer>
            {() => (
              <ListContainer>
                <DateList />
                <Transition
                  native
                  from={{ top: -200, opacity: 0.2 }}
                  enter={{ top: 0, opacity: 1 }}
                  leave={{ top: -200, opacity: 0.2 }}>
                  {store.yearMonthOverviewPanel
                    ? ({ top, opacity }) => (
                        <animated.div
                          style={{
                            position: "absolute",
                            width: "100%",
                            top,
                            opacity
                          }}>
                          <YearMonthList />
                        </animated.div>
                      )
                    : () => null}
                </Transition>
              </ListContainer>
            )}
          </Observer>
        </Container>
      </Provider>
    );
  }
}
