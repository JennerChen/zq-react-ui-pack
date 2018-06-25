import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import { Transition } from "react-spring";
import { switchProp } from "styled-tools";
import styles from "../styles";

const SelectTimeContainer = styled.div`
  padding: 10px 20px;
  background-color: ${styles.primary};
  height: 70px;
`;

const CurrentYear = styled.div`
  font-size: 14px;
  color: #fff;
  height: 22px;
  position: relative;
  overflow: hidden;
`;

const CurrentTime = styled.div`
  font-size: 20px;
  color: #fff;
  height: 32px;
  position: relative;
  overflow: hidden;
`;

const TextSpan = styled.span`
  position: absolute;
  cursor: pointer;
`;

@inject("store")
@observer
export default class extends Component {
  render() {
    const { selectedDay, scrollToSelectedDay, showYearMonthOverview } = this.props.store;
    let year = selectedDay ? selectedDay.year() : null;
    let monthDayInfo = selectedDay
      ? `${selectedDay.month() + 1}月 ${selectedDay.date()}日, ${switchProp("day", {
          0: "周日",
          1: "周一",
          2: "周二",
          3: "周三",
          4: "周四",
          5: "周五",
          6: "周六"
        })({ day: selectedDay.day() })}`
      : null;

    return (
      <SelectTimeContainer>
        {selectedDay ? (
          <Fragment>
            <CurrentYear>
              <Transition
                keys={[year].map(i => i)}
                from={{ opacity: 0.2, top: -16 }}
                enter={{ opacity: 1, top: 0 }}
                leave={{ opacity: 0, top: 16 }}>
                {[year].map(y => ({ opacity, top }) => (
                  <TextSpan
                    key={y}
                    style={{ opacity, top, fontSize: 14 }}
                    onClick={showYearMonthOverview}>
                    {y}
                  </TextSpan>
                ))}
              </Transition>
            </CurrentYear>
            <CurrentTime>
              <Transition
                keys={[monthDayInfo].map(i => i)}
                from={{ opacity: 0.2, top: -32 }}
                enter={{ opacity: 1, top: 0 }}
                leave={{ opacity: 0, top: 32 }}>
                {[monthDayInfo].map(y => ({ opacity, top }) => (
                  <TextSpan
                    key={y}
                    style={{ opacity, top, fontSize: 20 }}
                    onClick={scrollToSelectedDay}>
                    {y}
                  </TextSpan>
                ))}
              </Transition>
            </CurrentTime>
          </Fragment>
        ) : null}
      </SelectTimeContainer>
    );
  }
}
