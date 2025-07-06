// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttpException
      ? exception.getResponse()
      : 'Internal server error';

    let formattedMessage =
      typeof message === 'string'
        ? message
        : typeof message === 'object' && 'message' in message
          ? Array.isArray(message['message'])
            ? message['message'].join(', ')
            : message['message']
          : message;

    response.status(status).json({
      success: false,
      message: formattedMessage,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
