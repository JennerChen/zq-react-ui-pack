import { observable, action, computed } from "mobx";
import moment from "moment";

export default class DatePickerStore {
  @observable pickerProps = null;

  constructor(_) {
    this.pickerProps = _;
    this.currentDay = moment();
  }

  @computed
  get fromDay() {
    return moment(this.pickerProps.from);
  }

  @computed
  get toDay() {
    return moment(this.pickerProps.to);
  }

  @computed
  get displayDates() {
    let startTime = this.fromDay.clone().startOf("week");
    let endTime = this.toDay.clone().endOf("week");

    let dayArr = [];

    let temp = startTime;

    while (temp.isBefore(endTime)) {
      let day = temp.date();
      dayArr.push({
        daysInMonth: temp.daysInMonth(),
        year: temp.year(),
        month: temp.month() + 1,
        day: day >= 10 ? day : `0${day}`,
        disabled: !this.checkTimeInRange(temp)
      });

      temp = temp.add(1, "day");
    }

    return dayArr;
  }

  @action.bound
  checkTimeInRange(time) {
    return time.unix() <= this.toDay.unix() && time.unix() >= this.fromDay.unix();
  }
}
