import React, { PureComponent } from "react";
import ReactContentLoader from "react-content-loader";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  position: relative;
`;

export default class ContentLoader extends PureComponent {
  static propTypes = {
    rectUnitHeight: PropTypes.number,
    loopOffset: PropTypes.array
  };

  static defaultProps = {
    rectUnitHeight: 15,
    loopOffset: [10, 75, 75, 45],
    verticalGap: 10
  };

  render() {
    const { height, width, rectUnitHeight, verticalGap, loopOffset } = this.props;
    let total = Math.floor(height / (rectUnitHeight + verticalGap));
    let RectArr = [];
    for (let i = 0; i < total; i++) {
      RectArr.push(
        <rect
          key={"" + i}
          rx="4"
          ry="4"
          width={width - loopOffset[i % loopOffset.length]}
          height={rectUnitHeight}
          x={loopOffset[i % loopOffset.length]}
          y={verticalGap * (i + 1) + rectUnitHeight * i}
        />
      );
    }

    return (
      <Container style={{ width, height }}>
        <ReactContentLoader width={width} height={height}>
          {RectArr}
        </ReactContentLoader>
      </Container>
    );
  }
}
