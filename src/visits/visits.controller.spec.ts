import { Test, TestingModule } from '@nestjs/testing';
import { VisitsController } from './visits.controller';

describe('Visits Controller', () => {
  let controller: VisitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitsController],
    }).compile();

    controller = module.get<VisitsController>(VisitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
