import { Test, TestingModule } from '@nestjs/testing';
import { StudentMongoController } from './student-mongo.controller';

describe('StudentMongoController', () => {
  let controller: StudentMongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentMongoController],
    }).compile();

    controller = module.get<StudentMongoController>(StudentMongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
