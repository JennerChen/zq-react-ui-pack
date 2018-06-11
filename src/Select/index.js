import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { Transition } from "react-spring";
import { Flex, Item } from "../grid";
import styles from "../styles";
import Arrow from "./Arrow";
const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectContainer = styled(Flex).attrs({
  alignItems: "center"
})`
  cursor: pointer;
  height: 30px;
  background-color: #fff;
  min-width: 100px;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 0 8px;
  font-size: 12px;
  transition: all 0.3s;
  color: ${styles.text.second};
  user-select: none;
  &:hover {
    border-color: ${styles.primary};
  }
`;

const PopContainer = styled.div`
  background-color: #fff;
  z-index: 1001;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

const modifiers = {
  flip: { enabled: false },
  //  preventOverflow: { enabled: false },
  hide: { enabled: false }
};

export default class extends Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.any
  };

  state = {
    show: false
  };

  renderPopUp({ scale, opacity, offset }) {
    return (
      <Popper
        placement="bottom"
        modifiers={{
          ...modifiers,
          computeStyle: { gpuAcceleration: false }
        }}>
        {({ ref, style: { top, left, position }, placement, arrowProps }) => {
          return (
            <PopContainer
              innerRef={ref}
              style={{
                marginTop: 12,
                width: 160,
                top: 0,
                left: 0,
                position,
                opacity,
                transform: `translate3d(${left}px, ${top}px, 0) scaleY(${scale})`,
                transformOrigin: "top center"
              }}>
              <Arrow
                bg={"#232323"}
                innerRef={arrowProps.ref}
                data-placement={placement}
                style={arrowProps.style}
              />
              <p style={{ width: 150 }}>Popper element debugger debugger debugger</p>
            </PopContainer>
          );
        }}
      </Popper>
    );
  }

  render() {
    return (
      <Container>
        <Manager>
          <Reference>
            {({ ref }) => (
              <SelectContainer
                innerRef={ref}
                onClick={() =>
                  this.setState({
                    show: !this.state.show
                  })
                }>
                <Item>哈哈哈</Item>
              </SelectContainer>
            )}
          </Reference>
          <Transition
            from={{ opacity: 0, offset: -20, scale: 0.5 }}
            enter={{ opacity: 1, offset: 0, scale: 1 }}
            leave={{ opacity: 0, offset: -20, scale: 0.5 }}>
            {this.state.show && this.renderPopUp}
          </Transition>
        </Manager>
      </Container>
    );
  }
}
