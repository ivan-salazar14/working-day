import { DateTime } from 'luxon';
import { Holiday, HolidaysAdapter } from '../../infrastructure/adapters/holidaysAdapter';

export class BusinessDateService {
  constructor(private holidaysAdapter: HolidaysAdapter) {}

  async addBusinessDays(startDate: DateTime, days: number): Promise<DateTime> {
    let current = startDate;
    let added = 0;
    const holidays = await this.holidaysAdapter.fetchHolidays();
    const holidayDates = new Set(holidays.map(h => h.date));

    while (added < days) {
      current = current.plus({ days: 1 });
      if (this.isBusinessDay(current, holidayDates)) {
        added++;
      }
    }
    return current;
  }

  async addBusinessHours(startDate: DateTime, hours: number): Promise<DateTime> {
    let current = startDate;
    let added = 0;
    const holidays = await this.holidaysAdapter.fetchHolidays();
    const holidayDates = new Set(holidays.map(h => h.date));

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
    return new Set(holidays.map(h => h.date));
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
      return date.plus({ days: 1 }).set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
    }
    if (hour === 12 && minute >= 0 && minute < 60) {
      return date.set({ hour: 13, minute: 0, second: 0, millisecond: 0 });
    }
    return date.set({ second: 0, millisecond: 0 });
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