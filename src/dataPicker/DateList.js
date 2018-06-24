import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Grid } from "react-virtualized";
import { ifProp } from "styled-tools";
import { Flex } from "../grid";
import styles from "../styles";
import { getScrollbarWidth } from "../util";
const Container = styled(Flex).attrs({
  wrap: "wrap"
})`
  height: 200px;
  overflow: auto;

  & .ReactVirtualized__Grid {
    outline: none;
  }
`;

const TimeInner = styled(Flex).attrs({
  flex: "inline-flex",
  justifyContent: "center",
  alignItems: "center"
})`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid transparent;

  ${ifProp(
    "highlight",
    css`
      background-color: ${styles.primary} !important;
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
  border: 1px solid transparent;
  user-select: none;
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
`;

@inject("store")
@observer
export default class extends Component {
  render() {
    const { displayDates, currentDay } = this.props.store;
    const currentString = currentDay.format("YYYY-MM-DD");
    console.log(displayDates);
    return (
      <Container>
        <Grid
          cellRenderer={({ columnIndex, key, rowIndex, style }) => {
            let date = displayDates[rowIndex * 7 + columnIndex];
            return (
              <TimeColumn key={key} data-key={key} style={style} disabled={date.disabled}>
                <TimeInner today={currentString === `${date.year}-${date.month}-${date.day}`}>
                  <span>{date.day}</span>
                </TimeInner>
              </TimeColumn>
            );
          }}
          columnCount={7}
          columnWidth={40}
          height={200}
          rowCount={displayDates.length / 7}
          rowHeight={40}
          width={280 + getScrollbarWidth()}
        />
      </Container>
    );
  }
}
