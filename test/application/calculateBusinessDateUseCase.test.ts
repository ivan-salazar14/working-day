import { expect } from 'chai';
import { CalculateBusinessDateUseCase } from '../../src/application/useCases/calculateBusinessDateUseCase';
import { BusinessDateService } from '../../src/domain/services/businessDateService';
import { DateTime } from 'luxon';

class MockBusinessDateService extends BusinessDateService {
  constructor() {
    super({
      fetchHolidays: async () => ['2025-01-01']
    } as any);
  }

  async getHolidayDates(): Promise<Set<string>> {
    return new Set(['2025-01-01']);
  }

  async addBusinessDays(start: DateTime, days: number): Promise<DateTime> {
    return start.plus({ days });
  }

  async addBusinessHours(start: DateTime, hours: number): Promise<DateTime> {
    return start.plus({ hours });
  }
}

describe('CalculateBusinessDateUseCase', () => {
  let useCase: CalculateBusinessDateUseCase;
  let mockService: MockBusinessDateService;

  beforeEach(() => {
    mockService = new MockBusinessDateService();
    useCase = new CalculateBusinessDateUseCase(mockService);
  });

  it('should execute with days', async () => {
    const request = { days: 1 };
    const result = await useCase.execute(request);
    expect(result).to.be.a('string');
  });

  it('should execute with hours', async () => {
    const request = { hours: 1 };
    const result = await useCase.execute(request);
    expect(result).to.be.a('string');
  });
});