import React, { Component } from "react";
import { flex, DatePicker } from "../../src";

export default class extends Component {
  state = {
    loading: true,
    selectedDay: ""
  };

  render() {
    return (
      <div style={{ padding: 10 }}>
        <DatePicker
          value={this.state.selectedDay}
          onChange={day =>
            this.setState({
              selectedDay: day.format("YYYY-MM-DD")
            })
          }
          disabledDate={date => date.year() === 2017}
        />
      </div>
    );
  }
}
