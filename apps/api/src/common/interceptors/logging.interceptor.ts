import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    Logger,
    NestInterceptor,
  } from '@nestjs/common';
  import type { Request, Response } from 'express';
  import { Observable, catchError, tap, throwError } from 'rxjs';
  
  /**
   * Logs structured request/response metadata (method, path, status code,
   * duration) for every HTTP request.
   *
   * Deliberately logs ONLY that metadata — never headers, cookies, query
   * strings, or the request/response body — so auth tokens, passwords, and
   * password-reset tokens can never end up in application logs.
   */
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');
  
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<unknown> {
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest<Request>();
      const response = httpContext.getResponse<Response>();
  
      const { method } = request;
      // `request.path` deliberately excludes the query string, so any
      // sensitive values passed as query params (e.g. ?token=...) are
      // never logged.
      const path = request.path ?? request.url;
      const start = Date.now();
  
      return next.handle().pipe(
        tap(() => {
          const duration = Date.now() - start;
          this.logger.log(
            `${method} ${path} ${response.statusCode} ${duration}ms`,
          );
        }),
        catchError((error: unknown) => {
          const duration = Date.now() - start;
          const statusCode =
            error instanceof HttpException ? error.getStatus() : 500;
          this.logger.error(
            `${method} ${path} ${statusCode} ${duration}ms`,
          );
          return throwError(() => error);
        }),
      );
    }
  }