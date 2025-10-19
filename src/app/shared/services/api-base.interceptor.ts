import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_BASE_URL } from 'app/api-base.token';
import { SessionService } from './session.service';

export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  const base = inject(API_BASE_URL);
  const sessionService = inject(SessionService);

  const isAbsolute = /^https?:\/\//i.test(req.url);
  const url = isAbsolute ? req.url : `${base}${req.url}`;

  const token = sessionService.currentUser();
  const headers = token
    ? req.headers.set('Code', `${token}`)
    : req.headers;

  return next(req.clone({ url, headers }));
};
