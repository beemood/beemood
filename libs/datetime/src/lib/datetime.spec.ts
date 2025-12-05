import { Datetime } from './datetime.js';
import { Duration } from './duration.js';

describe('datetime', () => {
  beforeAll(() => {
    const date = new Datetime();

    console.log('Current Date: ', date.toLocaleString());
    {
      const newDate = date.addSeconds(10);
      console.log('Adding 10 seconds :', newDate.toLocaleString());
    }
    {
      const newDate = date.addMinutes(10);
      console.log('Adding 10 minutes :', newDate.toLocaleString());
    }
    {
      const newDate = date.addHours(10);
      console.log('Adding 10 hours :', newDate.toLocaleString());
    }
    {
      const newDate = date.addDays(10);
      console.log('Adding 10 days :', newDate.toLocaleString());
    }
  });
  it('should add miliseconds', () => {
    const value = 100;
    const date = new Datetime();
    const newDate = date.addMiliseconds(value);

    expect(date.getTime() + Duration.milisecond(value)).toEqual(
      newDate.getTime()
    );
  });
  it('should remove miliseconds', () => {
    const value = -100;
    const date = new Datetime();
    const newDate = date.addMiliseconds(value);

    expect(date.getTime() + Duration.milisecond(value)).toEqual(
      newDate.getTime()
    );
  });

  //

  it('should add Seconds', () => {
    const value = 10_000_000;
    const date = new Datetime();
    const newDate = date.addSeconds(value);

    expect(date.getTime() + Duration.second(value)).toEqual(newDate.getTime());
  });
  it('should remove Seconds', () => {
    const value = -10_000_000;
    const date = new Datetime();
    const newDate = date.addSeconds(value);

    expect(date.getTime() + Duration.second(value)).toEqual(newDate.getTime());
  });

  //

  it('should add Minutes', () => {
    const value = 10_000_000;
    const date = new Datetime();
    const newDate = date.addMinutes(value);

    expect(date.getTime() + Duration.minute(value)).toEqual(newDate.getTime());
  });
  it('should remove Minutes', () => {
    const value = -10_000_000;
    const date = new Datetime();
    const newDate = date.addMinutes(value);

    expect(date.getTime() + Duration.minute(value)).toEqual(newDate.getTime());
  });

  it('should add Hours', () => {
    const value = 10_000_000;
    const date = new Datetime();
    const newDate = date.addHours(value);

    expect(date.getTime() + Duration.hours(value)).toEqual(newDate.getTime());
  });
  it('should remove Hours', () => {
    const value = -10_000_000;
    const date = new Datetime();
    const newDate = date.addHours(value);

    expect(date.getTime() + Duration.hours(value)).toEqual(newDate.getTime());
  });
});
