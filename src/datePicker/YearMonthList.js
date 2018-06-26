import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { List } from "react-virtualized";
import { Flex } from "../grid";
import { getScrollbarWidth } from "../util";
import { TimeInner, TimeColumn } from "./baseUI";
import styles from "../styles";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 200px;
  width: 100%;
  z-index: 10;
  background-color: #fff;
`;

const YearSpan = styled.div`
  line-height: 120px;
  font-size: 18px;
  text-align: center;
  width: 80px;
`;

const YearRow = styled(Flex)`
  border-bottom: 1px solid #e2dfdf;

  &:hover {
    ${YearSpan} {
      color: ${styles.primary};
    }
  }
`;

const MonthSpan = styled.div`
  font-size: 12px;
  line-height: initial;
  height: 14px;
  white-space: nowrap;
  word-wrap: normal;
`;

@inject("store")
@observer
export default class extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const {
      fromYear,
      totalYears,
      selectDayYearIndex,
      selectedDay,
      checkTimeInRange,
      currentDay,
      scrollToTargetPos,
      hideYearMonthOverview
    } = this.props.store;
    const currentString = currentDay.format("YYYY-MM");

    return (
      <Container>
        <List
          ref={list => (this.list = list)}
          width={280 + getScrollbarWidth()}
          height={200}
          rowCount={totalYears}
          rowHeight={120}
          scrollToIndex={selectDayYearIndex}
          rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
            let viewYear = fromYear.clone().add(index, "year");
            let year = viewYear.year();
            return (
              <YearRow key={key} style={style}>
                <YearSpan>{year}</YearSpan>
                <Flex wrap={"wrap"} style={{ width: 200 }}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(monthIndex => {
                    let month = viewYear.clone().add(monthIndex, "month");
                    let monthString = month.format("YYYY-MM");
                    let highlight = selectedDay
                      ? monthString === selectedDay.format("YYYY-MM")
                      : false;
                    return (
                      <TimeColumn
                        key={"" + monthIndex}
                        title={monthString}
                        disabled={!checkTimeInRange(month)}
                        onClick={() => {
                          scrollToTargetPos(month);
                          hideYearMonthOverview();
                        }}>
                        <TimeInner
                          today={currentString === month.format("YYYY-MM")}
                          highlight={highlight}
                          allowRipple={!highlight}>
                          <MonthSpan>
                            {
                              [
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
                              ][monthIndex]
                            }
                          </MonthSpan>
                        </TimeInner>
                      </TimeColumn>
                    );
                  })}
                </Flex>
              </YearRow>
            );
          }}
        />
      </Container>
    );
  }
}
