import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";
import { List } from "react-virtualized";
import { ifProp, switchProp } from "styled-tools";
import { Transition } from "react-spring";
import { Flex } from "../grid";
import styles from "../styles";
import { getScrollbarWidth, withRipple } from "../util";

const Container = styled(Flex).attrs({
  wrap: "wrap"
})`
  height: 200px;
  overflow: auto;

  & .ReactVirtualized__Grid {
    outline: none;
  }
`;

const TimeInner = styled(
  withRipple({
    allowRipple: true,
    rippleEffect: "center",
    rippleShape: "circle",
    rippleColor: styles.primary
  })(Flex)
).attrs({
  flex: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  direction: "column"
})`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid transparent;
  font-size: 12px;
  ${ifProp(
    "highlight",
    css`
      background-color: ${styles.primary} !important;
      color: #fff;
    `
  )};

  ${ifProp(
    "today",
    css`
      border-color: ${styles.primary};
    `
  )};
`;

const TimeColumn = styled(Flex).attrs({
  flex: "inline-flex",
  justifyContent: "center",
  alignItems: "center"
})`
  user-select: none;
  width: 40px;
  height: 40px;
  position: relative;
  &:hover {
    & ${TimeInner} {
      background-color: #efefef;
    }
  }

  ${ifProp(
    "disabled",
    css`
      color: ${styles.disabled};

      pointer-events: none;
    `
  )};

  ${ifProp(
    "showTopBorder",
    css`
      border-top: 1px solid #e2dfdf;
    `
  )};

  ${ifProp(
    "showLeftBorder",
    css`
      border-left: 1px solid #e2dfdf;
    `
  )};
`;

const TimeMention = styled.div`
  font-size: 12px;

  line-height: initial;
  transform: scale(0.8);
  height: 14px;
  white-space: nowrap;
  word-wrap: normal;
  ${switchProp("color", {
    red: css`
      color: red;
      ${ifProp(
        "highlight",
        css`
          color: #fff;
        `
      )};
    `,
    gray: css`
      color: ${styles.text.third};
      ${ifProp(
        "highlight",
        css`
          color: #fff;
        `
      )};
    `
  })};
`;

const YearMonthInfo = styled.div`
  position: absolute;
  z-index: 10;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 26px;
  color: #333;
  width: 100%;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.6);
`;

const DateSpan = styled.div`
  font-size: 12px;
  line-height: initial;
  height: 12px;
`;
@inject("store")
@observer
export default class extends Component {
  componentDidMount() {
    console.log(this.list);
    this.props.store.bindDateListComponent(this);
  }

  componentWillUnmount() {
    this.props.store.bindDateListComponent(null);
  }

  renderMonth(monthIndex) {
    return [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ][monthIndex];
  }

  render() {
    const {
      totalWeeks,
      currentDay,
      startTime,
      checkTimeInRange,
      currentDayIndex,
      setSelectedDay,
      selectedDay,
      pickerProps
    } = this.props.store;
    const currentString = currentDay.format("YYYY-MM-DD");
    return (
      <Container>
        <List
          ref={list => (this.list = list)}
          width={280 + getScrollbarWidth()}
          height={200}
          rowCount={Math.max(totalWeeks, 5)}
          rowHeight={40}
          scrollToIndex={currentDayIndex}
          rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
            let weekStartTime = startTime.clone().add(index, "week");
            let dayOfMonth = weekStartTime.date();
            let yearMonthInfo =
              isScrolling && 15 - dayOfMonth >= 0 && 15 - dayOfMonth < 7
                ? `${weekStartTime.year()} ${this.renderMonth(weekStartTime.month())}`
                : null;

            return (
              <Flex key={key} style={style}>
                {[0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => {
                  let date = weekStartTime.clone().add(dayOfWeek, "day");
                  let dateString = date.format("YYYY-MM-DD");
                  let highlight = selectedDay
                    ? dateString === selectedDay.format("YYYY-MM-DD")
                    : false;
                  let isFirstDayOfMonth = date.format("DD") === "01";
                  let isFirstDayOfYear = date.format("MM-DD") === "01-01";
                  let isInFirst7DayInMonth = date.date() <= 7;
                  let showLeftBorder = isFirstDayOfMonth && date.day() !== 0;
                  return (
                    <TimeColumn
                      key={"" + dayOfWeek}
                      disabled={!checkTimeInRange(date) || !!pickerProps.disabledDate(date)}
                      title={date.format("YYYY-MM-DD")}
                      onClick={() => setSelectedDay(date)}
                      showTopBorder={isInFirst7DayInMonth}
                      showLeftBorder={showLeftBorder}>
                      <TimeInner today={currentString === dateString} highlight={highlight}>
                        {highlight || isFirstDayOfMonth || isFirstDayOfYear ? (
                          <TimeMention highlight={highlight} color={"gray"}>
                            {isFirstDayOfYear
                              ? date.format("YYYY")
                              : this.renderMonth(date.month())}
                          </TimeMention>
                        ) : currentString === date.format("YYYY-MM-DD") ? (
                          <TimeMention color={"red"}>今日</TimeMention>
                        ) : null}
                        <DateSpan>{date.format("DD")}</DateSpan>
                      </TimeInner>
                    </TimeColumn>
                  );
                })}
                <Transition from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
                  {isScrolling
                    ? ({ opacity }) => (
                        <YearMonthInfo style={{ opacity }}>{yearMonthInfo}</YearMonthInfo>
                      )
                    : () => null}
                </Transition>
              </Flex>
            );
          }}
        />
      </Container>
    );
  }
}
