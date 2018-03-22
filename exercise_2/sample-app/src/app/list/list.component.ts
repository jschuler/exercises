import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: User[];
  columns = [
    {
      field: 'name',
      displayName: 'Name'
    },
    {
      field: 'username',
      displayName: 'Username'
    },
    {
      field: 'email',
      displayName: 'E-mail'
    },
    {
      field: 'stringAddress',
      displayName: 'Address'
    }
  ];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = this.processData(users);
      });
  }

  processData(users) {
    users.forEach(function(user) {
      user.stringAddress = user.address ? (user.address.street + ', ' + user.address.suite + '<br>' +
        user.address.city + ', ' + user.address.zipcode) : '';
    });

    // Sort users by name
    users = _.orderBy(users, ['name']);

    return users;
  }

  trackByFn(index, item) {
    return index;
  }

}
