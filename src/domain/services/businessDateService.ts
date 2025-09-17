import { DateTime } from 'luxon';
import { Holiday, HolidaysAdapter } from '../../infrastructure/adapters/holidaysAdapter';

export class BusinessDateService {
  constructor(private holidaysAdapter: HolidaysAdapter) {}

  async addBusinessDays(startDate: DateTime, days: number): Promise<DateTime> {
    let current = startDate;
    let added = 0;
    const holidays = await this.holidaysAdapter.fetchHolidays();
    const holidayDates = new Set(holidays);

    while (added < days) {
      if (this.isBusinessDay(current, holidayDates)) {
        added++;
        if (added < days) {
          current = current.plus({ days: 1 });
        }
      } else {
        current = current.plus({ days: 1 });
      }
    }
    return current;
  }

  async addBusinessHours(startDate: DateTime, hours: number): Promise<DateTime> {
    let current = startDate;
    let added = 0;
    const holidays = await this.holidaysAdapter.fetchHolidays();
    const holidayDates = new Set(holidays);

    while (added < hours) {
      if (this.isBusinessHour(current, holidayDates)) {
        added++;
        current = current.plus({ minutes: 60 });
      } else {
        current = this.nextBusinessHour(current, holidayDates);
      }
    }
    return current;
  }

  async getHolidayDates(): Promise<Set<string>> {
    const holidays = await this.holidaysAdapter.fetchHolidays();
    return new Set(holidays);
  }

  isBusinessDay(date: DateTime, holidayDates: Set<string>): boolean {
    const dayOfWeek = date.weekday; // 1 = Monday, 7 = Sunday
    if (dayOfWeek === 6 || dayOfWeek === 7) {
      return false;
    }
    const dateStr = date.toISODate();
    if (dateStr && holidayDates.has(dateStr)) {
      return false;
    }
    return true;
  }

  adjustToBusinessTime(date: DateTime): DateTime {
    const hour = date.hour;
    const minute = date.minute;
    if (hour < 8) {
      return date.set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
    }
    if (hour >= 17) {
      return date.set({ hour: 17, minute: 0, second: 0, millisecond: 0 });
    }
    if (hour === 12 && minute >= 0 && minute < 60) {
      return date.set({ hour: 13, minute: 0, second: 0, millisecond: 0 });
    }
    return date.set({ second: 0, millisecond: 0 });
  }

  async adjustToBusinessTimeBackwards(date: DateTime, holidayDates: Set<string>): Promise<DateTime> {
    let adjusted = date.set({ second: 0, millisecond: 0 });

    // If not a business day, go back to previous business day at 5 PM
    while (!this.isBusinessDay(adjusted, holidayDates)) {
      adjusted = adjusted.minus({ days: 1 }).set({ hour: 17, minute: 0 });
    }

    // If business day but outside hours, adjust backwards within the day
    const hour = adjusted.hour;
    if (hour < 8) {
      // Before business hours: go to 5 PM previous day
      adjusted = adjusted.minus({ days: 1 }).set({ hour: 17, minute: 0 });
    } else if (hour >= 17) {
      // After business hours: stay at 5 PM same day
      adjusted = adjusted.set({ hour: 17, minute: 0 });
    } else if (hour === 12) {
      // Lunch hour: go back to 11 AM
      adjusted = adjusted.set({ hour: 11, minute: 0 });
    }
    // Else: already within business hours, no change

    return adjusted;
  }

  isBusinessHour(date: DateTime, holidayDates: Set<string>): boolean {
    const dayOfWeek = date.weekday;
    if (dayOfWeek === 6 || dayOfWeek === 7) {
      return false;
    }
    const dateStr = date.toISODate();
    if (dateStr && holidayDates.has(dateStr)) {
      return false;
    }
    const hour = date.hour;
    if (hour < 8 || hour >= 17) {
      return false;
    }
    if (hour === 12) {
      return false;
    }
    return true;
  }

  nextBusinessHour(date: DateTime, holidayDates: Set<string>): DateTime {
    let next = date.plus({ minutes: 60 });
    while (!this.isBusinessHour(next, holidayDates)) {
      next = next.plus({ minutes: 60 });
    }
    return next;
  }
}