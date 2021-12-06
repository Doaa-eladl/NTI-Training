import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _data:DataService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token')
    const isAdmin = localStorage.getItem('isAdmin')
    const isAuthed = localStorage.getItem('isAuthed')

    if(token){
      request = request.clone({
        headers: request.headers.set("token", `Bearer ${token}`)
      })
      if(isAdmin) {
        this._data.isAdmin=true
        this._data.isAuthed=true
      }
      if(isAuthed) this._data.isAuthed=true
    }
    return next.handle(request);
  }
}
