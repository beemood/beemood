export class Duration {
  static mils(value: number) {
    return value;
  }

  static secs(value: number) {
    return value * 1000;
  }

  static mins(value: number) {
    return value * 60 * 1000;
  }

  static hours(value: number) {
    return value * 60 * 60 * 1000;
  }
}
