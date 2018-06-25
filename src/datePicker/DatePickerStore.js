import { observable, action, computed } from "mobx";
import moment from "moment";

export default class DatePickerStore {
  @observable pickerProps = null;
  dateListComponent = null;

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
  get selectedDay() {
    if (!this.pickerProps.value) return null;
    return moment(this.pickerProps.value);
  }

  @computed
  get totalWeeks() {
    return this.toDay.diff(this.fromDay, "week") + 2;
  }

  @computed
  get startTime() {
    return this.fromDay.clone().startOf("week");
  }

  @computed
  get endTime() {
    let endTime = this.toDay.clone().endOf("week");
    // 开始和截止时间小于1个月, 补齐差值
    if (this.totalWeeks <= 4) {
      return this.startTime
        .clone()
        .add(4, "week")
        .endOf("week");
    }

    return endTime;
  }

  @computed
  get currentDayIndex() {
    return this.currentDay.diff(this.startTime, "week");
  }

  @action.bound
  updatePickerProps(newProps) {
    this.pickerProps = newProps;
  }

  @action.bound
  checkTimeInRange(time) {
    return time.unix() <= this.toDay.unix() && time.unix() >= this.fromDay.unix();
  }

  @action.bound
  bindDateListComponent(dateListComponent) {
    this.dateListComponent = dateListComponent;
  }

  @action.bound
  scrollToToday() {
    if (this.dateListComponent) {
      this.dateListComponent.list.scrollToRow(this.currentDayIndex);
    }
  }

  @action.bound
  scrollToSelectedDay() {
    if (this.dateListComponent && this.selectedDay) {
      this.dateListComponent.list.scrollToRow(this.selectedDay.diff(this.startTime, "week"));
    }
  }

  @action.bound
  scrollToTargetTime(targetTime) {
    if (this.dateListComponent) {
      this.dateListComponent.list.scrollToRow(
        Math.min(this.totalWeeks, Math.max(0, targetTime.diff(this.startTime, "week") - 2))
      );
    }
  }

  @action.bound
  setSelectedDay(day) {
    this.pickerProps.onChange(day);
  }
}
