import React, { Component } from "react";
import { flex, DatePicker } from "../../src";
import styled from "styled-components";

export default class extends Component {
  state = {
    loading: true
  };

  render() {
    return (
      <div style={{ padding: 10 }}>
        <DatePicker/>

      </div>
    );
  }
}
