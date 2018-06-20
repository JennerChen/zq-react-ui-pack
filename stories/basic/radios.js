import React, { Component } from "react";
import { Radio, Flex } from "../../src";

const options = [
  {
    label: "水果",
    value: 1
  },
  {
    label: "蔬菜",
    value: 2,
    disabled: true
  },
  {
    label: "海鲜",
    value: 3
  }
];

export default class extends Component {
  state = {
    selectedFruit1: null,
    selectedFruit2: null,
    selectedFruit3: 2
  };

  render() {
    const { selectedFruit1, selectedFruit2, selectedFruit3 } = this.state;

    return (
      <div>
        <Radio.Group
          value={selectedFruit1}
          onChange={val =>
            this.setState({
              selectedFruit1: val
            })
          }
          options={options}
        />

        <Flex direction={"column"}>
          <Radio.Group
            value={selectedFruit2}
            onChange={val =>
              this.setState({
                selectedFruit2: val
              })
            }
            options={options}
          />
        </Flex>

        <Radio.Group
          onChange={val =>
            this.setState({
              selectedFruit3: val
            })
          }
          value={selectedFruit3}>
          {options.map(option => (
            <Radio
              key={option.value}
              value={option.value}
              disabled={ option.disabled }
            >
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    );
  }
}
