import { Test, TestingModule } from '@nestjs/testing';
import { StudentMongoService } from './student-mongo.service';

describe('StudentMongoService', () => {
  let service: StudentMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentMongoService],
    }).compile();

    service = module.get<StudentMongoService>(StudentMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
