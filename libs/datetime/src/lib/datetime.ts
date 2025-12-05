export class Datetime extends Date {
  clone() {
    return new Datetime(this.getTime());
  }
  addMiliseconds(miliseconds = 1) {
    const cloned = this.clone();
    cloned.setUTCMilliseconds(cloned.getUTCMilliseconds() + miliseconds);
    return cloned;
  }

  addSeconds(seconds = 1) {
    const cloned = this.clone();
    cloned.setUTCSeconds(cloned.getUTCSeconds() + seconds);
    return cloned;
  }

  addMinutes(minutes = 1) {
    const cloned = this.clone();
    cloned.setUTCMinutes(cloned.getUTCMinutes() + minutes);
    return cloned;
  }

  addHours(hours = 1) {
    const cloned = this.clone();
    cloned.setUTCHours(cloned.getUTCHours() + hours);
    return cloned;
  }

  addDays(days = 1) {
    const cloned = this.clone();
    cloned.setUTCDate(cloned.getUTCDate() + days);
    return cloned;
  }

  addWeeks(weeks = 1) {
    const cloned = this.clone();
    cloned.setUTCDate(cloned.getUTCDate() + weeks * 7);
    return cloned;
  }

  addMonths(months = 1) {
    const cloned = this.clone();
    cloned.setUTCMonth(cloned.getUTCMonth() + months);
    return cloned;
  }

  addYears(years = 1) {
    const cloned = this.clone();
    cloned.setUTCFullYear(cloned.getUTCFullYear() + years);
    return cloned;
  }

  addDecades(decades = 1) {
    const cloned = this.clone();
    cloned.setUTCFullYear(cloned.getUTCFullYear() + decades * 10);
    return cloned;
  }
}
