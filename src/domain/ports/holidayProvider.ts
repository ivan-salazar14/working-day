export interface HolidayProvider {
  fetchHolidays(): Promise<string[]>;
}