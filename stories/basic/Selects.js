import React, { Component } from "react";
import { Select, utils } from "../../src";
import styled from "styled-components";

const TestEl = utils.withRipple(styled.div`
    width: 100px;
    height: 30px;
    background-color: pink;
    
`);
export default class extends Component {
  state = {
    selectedFruit: null
  };

  render() {
    const { selectedFruit } = this.state;

    return (
      <div>
        dd
        <Select
          options={[
            {
              label: "水果",
              value: 0
            },
            {
              label: "蔬菜",
              value: 1
            },
            {
              label: "海鲜",
              value: 2
            },
            {
              label: "海鲜海鲜海鲜海鲜海鲜海鲜海鲜海鲜海鲜海鲜",
              value: 3
            }
          ]}
          value={selectedFruit}
          style={ { width: 200 } }
          onChange={val =>
            this.setState({
              selectedFruit: val
            })
          }
        />

        <TestEl onClick={ () => console.log(111) }/>
      </div>
    );
  }
}
