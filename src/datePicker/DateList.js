import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import { List } from "react-virtualized";
import { Transition } from "react-spring";
import { Flex } from "../grid";
import { getScrollbarWidth } from "../util";
import { TimeInner, TimeColumn, TimeMention } from "./baseUI";

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
  height: 14px;
`;

@inject("store")
@observer
export default class extends Component {
  componentDidMount() {
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
                    onClick={() => (highlight ? null : setSelectedDay(date))}
                    showTopBorder={isInFirst7DayInMonth}
                    showLeftBorder={showLeftBorder}>
                    <TimeInner
                      today={currentString === dateString}
                      highlight={highlight}
                      allowRipple={!highlight}>
                      {highlight || isFirstDayOfMonth || isFirstDayOfYear ? (
                        <TimeMention highlight={highlight} color={"gray"}>
                          {isFirstDayOfYear ? date.format("YYYY") : this.renderMonth(date.month())}
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
    );
  }
}
