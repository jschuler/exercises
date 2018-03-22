import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UserComponent } from './user.component';
import { UserService } from '../user.service';
import { User } from '../user';

class MockUserService {
  users = [{
    id: 42,
    name: 'Test User',
    username: 'test',
    email: 'test@email',
    website: 'test web',
    phone: '123-456'
  }];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: function() {
        return 42;
      }
    }
  };
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ RouterTestingModule ],
      providers: [ UserService ]
    });
    TestBed.overrideComponent(UserComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have user fields', () => {
    expect(component.user.id).toEqual(42);
    expect(component.user.name).toEqual('Test User');
    expect(component.user.email).toEqual('test@email');
    expect(component.user.website).toEqual('test web');
    expect(component.user.phone).toEqual('123-456');
  });
});
