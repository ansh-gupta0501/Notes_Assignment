import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch() // 	Decorator that marks this class as an exception filter. It can catch all exceptions unless you specify a type.
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {  // it means it catch only httpException // Method called when an exception is thrown. It receives the error (exception) and the context (host).
    const ctx = host.switchToHttp(); // this tells nest js that we are simply working on http protocol ,not any web sockets like
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception.getStatus(); // get status code of exception

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message
    })

  }
}
