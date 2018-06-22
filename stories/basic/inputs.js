import React, { Component } from "react";
import { Button, utils, Card, Flex, Input } from "../../src";
import styled from "styled-components";
import { VerifiedUser, AccessAlarm } from "styled-icons/material";

export default class Cards extends Component {
  state = {
    value1: ""
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
            label={"username"}
            value={this.state.value1}
            leanIcon={LeanIcon => (
              <LeanIcon allowRipple={true}>
                <VerifiedUser size={20} />
              </LeanIcon>
            )}
            onChange={value => {
              this.setState({
                value1: value
              });
            }}
            helpText={"请输入用户名"}
            clearIcon={true}
            style={{ marginRight: 40, width: 300 }}
          />

          <Input
            mode={"outlined"}
            label={"username"}
            value={this.state.value1}
            trailIcon={TrailIcon => (
              <TrailIcon allowRipple={true}>
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
            <span>压缩的输入框</span>
          </Flex>

          <Input
            size={ "dense" }
            label={"username"}
            value={this.state.value1}
            leanIcon={LeanIcon => (
              <LeanIcon allowRipple={true}>
                <VerifiedUser size={20} />
              </LeanIcon>
            )}
            onChange={value => {
              this.setState({
                value1: value
              });
            }}
            helpText={"请输入用户名"}
            clearIcon={true}
            style={{ marginRight: 40, width: 300 }}
          />

          <Input
            size={ "dense" }
            mode={"outlined"}
            label={"username"}
            value={this.state.value1}
            trailIcon={TrailIcon => (
              <TrailIcon allowRipple={true}>
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
      </div>
    );
  }
}
