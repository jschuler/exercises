import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ListComponent } from './list.component';
import { UserService } from '../user.service';
import { User } from '../user';

class MockUserService {
  users = [{
    id: 42,
    name: 'B Test User',
    username: 'test',
    email: 'test@email',
    website: 'test web',
    phone: '123-456'
  }, {
    id: 43,
    name: 'A Another User',
    username: 'anothertest',
    email: 'anothertest@email',
    website: 'anothertest web',
    phone: '789-543'
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

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ RouterTestingModule ],
      providers: [ UserService ]
    });
    TestBed.overrideComponent(ListComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have users', () => {
    expect(component.users.length).toEqual(2);
    expect(component.users[0].name).toEqual('A Another User');
    expect(component.users[1].name).toEqual('B Test User');
  });

  it('should be sorted by name', () => {
    expect(component.users[0].name).toEqual('A Another User');
    expect(component.users[1].name).toEqual('B Test User');
  });
});
