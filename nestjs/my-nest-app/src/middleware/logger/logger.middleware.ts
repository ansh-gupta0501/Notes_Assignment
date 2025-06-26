import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request,Response,NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    console.log(`inside middleware [${req.method}] - [${req.originalUrl}]`)
    // now we want this middlware globally
    next();
  }
}
