import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { User } from './user';

@Injectable()
export class UserService {

  url: string = 'http://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

}
