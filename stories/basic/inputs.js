import React, { Component } from "react";
import { Button, utils, Card, Flex, Input, MDSelect } from "../../src";
import styled from "styled-components";
import { VerifiedUser, AccessAlarm, Clear } from "styled-icons/material";

const options = [
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
];

export default class Cards extends Component {
  state = {
    value1: "",
    selectedFruit: ""
  };

  render() {
    return (
      <div style={{ padding: 10 }}>
        <Flex style={{ margin: 20 }}>
          <Flex
            flex={"inline-flex"}
            justifContent={"center"}
            alignItems={"center"}
            style={{ width: 150 }}>
            <span>标准输入框</span>
          </Flex>

          <Input
            label={"用户名"}
            value={this.state.value1}
            leanIcon={LeanIcon => (
              <LeanIcon>
                <VerifiedUser size={20} />
              </LeanIcon>
            )}
            onChange={value => {
              this.setState({
                value1: value
              });
            }}
            helpText={"请输入用户名"}
            allowClear={true}
            style={{ marginRight: 40, width: 300 }}
          />

          <Input
            type={"password"}
            mode={"outlined"}
            label={"password"}
            value={this.state.value1}
            trailIcon={TrailIcon => (
              <TrailIcon>
                <AccessAlarm size={20} />
              </TrailIcon>
            )}
            onChange={value =>
              this.setState({
                value1: value
              })
            }
            helpText={"请输入密码"}
            style={{ marginRight: 40, width: 300 }}
            allowClear={ true }
          />
        </Flex>

        <Flex style={{ margin: 20 }}>
          <Flex
            flex={"inline-flex"}
            justifContent={"center"}
            alignItems={"center"}
            style={{ width: 150 }}>
            <span>压缩的输入框</span>
          </Flex>

          <Input
            size={"dense"}
            label={"username"}
            value={this.state.value1}
            leanIcon={LeanIcon => (
              <LeanIcon allowRipple={ true } onClick={ () => alert("you find it") }>
                <VerifiedUser size={20} />
              </LeanIcon>
            )}
            onChange={value => {
              this.setState({
                value1: value
              });
            }}
            helpText={"请输入用户名"}
            allowClear={true}
            style={{ marginRight: 40, width: 300 }}
          />

          <Input
            size={"dense"}
            mode={"outlined"}
            label={"username"}
            value={this.state.value1}
            leanIcon={LeanIcon => (
              <LeanIcon>
                <VerifiedUser size={20} />
              </LeanIcon>
            )}
            trailIcon={TrailIcon => (
              <TrailIcon>
                <AccessAlarm size={20} />
              </TrailIcon>
            )}
            onChange={value =>
              this.setState({
                value1: value
              })
            }
            helpText={"请输入用户名"}
            style={{ marginRight: 40, width: 300 }}
          />
        </Flex>

        <Flex style={{ margin: 20 }}>
          <Flex
            flex={"inline-flex"}
            justifContent={"center"}
            alignItems={"center"}
            style={{ width: 150 }}>
            <span> 选择框</span>
          </Flex>

          <MDSelect
            label={"水果"}
            value={this.state.selectedFruit}
            options={options}
            leanIcon={LeanIcon => (
              <LeanIcon>
                <VerifiedUser size={20} />
              </LeanIcon>
            )}
            onChange={value => {
              this.setState({
                selectedFruit: value
              });
            }}
            helpText={"请选择水果"}
            style={{ marginRight: 40, width: 300 }}
          />

          <MDSelect
            mode={"outlined"}
            label={"水果"}
            value={this.state.selectedFruit}
            options={options}
            leanIcon={LeanIcon => (
              <LeanIcon>
                <VerifiedUser size={20} />
              </LeanIcon>
            )}
            onChange={value => {
              this.setState({
                selectedFruit: value
              });
            }}
            helpText={"请选择水果"}
            style={{ marginRight: 40, width: 300 }}
          />

          <MDSelect
            size={"dense"}
            label={"水果"}
            value={this.state.selectedFruit}
            options={options}
            leanIcon={LeanIcon => (
              <LeanIcon>
                <VerifiedUser size={20} />
              </LeanIcon>
            )}
            onChange={value => {
              this.setState({
                selectedFruit: value
              });
            }}
            helpText={"请选择水果"}
            style={{ marginRight: 40, width: 300 }}
          />

          <MDSelect
            size={"dense"}
            mode={"outlined"}
            label={"水果"}
            value={this.state.selectedFruit}
            options={options}
            leanIcon={LeanIcon => (
              <LeanIcon>
                <VerifiedUser size={20} />
              </LeanIcon>
            )}
            onChange={value => {
              this.setState({
                selectedFruit: value
              });
            }}
            helpText={"选择并且可以清除"}
            style={{ marginRight: 40, width: 300 }}
            trailIcon={TrailIcon =>
              this.state.selectedFruit ? (
                <TrailIcon
                  allowRipple={ true }
                  onClick={() => {
                    this.setState({
                      selectedFruit: null
                    });
                  }}>
                  <Clear size={20} />
                </TrailIcon>
              ) : null
            }
          />
        </Flex>
      </div>
    );
  }
}
