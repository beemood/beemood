export class Duration {
  static milisecond(miliseconds = 1) {
    return miliseconds;
  }

  static second(seconds = 1) {
    return seconds * this.milisecond(1000);
  }

  static minute(minutes = 1) {
    return minutes * this.second() * 60;
  }

  static hours(hours = 1) {
    return hours * this.minute() * 60;
  }

  static day(days = 1) {
    return days * this.hours() * 24;
  }

  static week(weeks = 1) {
    return weeks * this.day() * 7;
  }

  static month(months = 1) {
    return months * this.day() * 30;
  }

  static year(years = 1) {
    return years * this.day() * 365;
  }

  static decade(decades = 1) {
    return decades * this.year() * 10;
  }

  static toSeconds(miliseconds: number) {
    return miliseconds / 1000;
  }
  static toMinutes(miliseconds: number) {
    return this.toSeconds(miliseconds) / 60;
  }
  static toHours(miliseconds: number) {
    return this.toMinutes(miliseconds) / 60;
  }

  static toDays(miliseconds: number) {
    return this.toHours(miliseconds) / 24;
  }

  static toWeeks(miliseconds: number) {
    return this.toDays(miliseconds) / 7;
  }

  static toYears(miliseconds: number) {
    return this.toDays(miliseconds) / 365;
  }

  static toDecades(miliseconds: number) {
    return this.toYears(miliseconds) / 10;
  }
}
