import { observable, action, computed } from "mobx";
import moment from "moment";

//https://gist.github.com/andjosh/6764939
//t = current time
//b = start value
//c = change in value
//d = duration
const easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

export default class DatePickerStore {
  @observable pickerProps = null;

  @observable yearMonthOverviewPanel = false;

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

  @computed
  get selectDayYearIndex() {
    if (!this.selectedDay) return 0;
    return this.selectedDay.diff(this.fromYear, "year");
  }

  @computed
  get fromYear() {
    return this.fromDay.startOf("year");
  }

  @computed
  get toYear() {
    return this.toDay.endOf("year");
  }

  @computed
  get totalYears() {
    return this.toYear.diff(this.fromYear, "year") + 1;
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
  scrollToTargetPos(targetTime, silence = false) {
    let list = this.dateListComponent.list,
      duration = 200,
      increment = 20,
      currentTime = 0,
      start = this.dateListComponent.scrollTop,
      to = list.getOffsetForRow({
        index: targetTime.diff(this.startTime, "week")
      });

    if (silence) {
      return list.scrollToPosition(to);
    }

    const animateScroll = function() {
      currentTime += increment;
      let offset = easeInOutQuad(currentTime, start, to - start, duration);
      list.scrollToPosition(offset);
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  @action.bound
  setSelectedDay(day) {
    this.pickerProps.onChange(day);
  }

  @action.bound
  showYearMonthOverview() {
    this.yearMonthOverviewPanel = true;
  }

  @action.bound
  hideYearMonthOverview() {
    this.yearMonthOverviewPanel = false;
  }
}
