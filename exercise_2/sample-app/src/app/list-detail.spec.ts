import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user.service';
import { User } from './user';

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

describe('component: TestComponent', function () {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: '/list', pathMatch: 'full' },
          { path: 'list', component: ListComponent },
          { path: 'user/:id', component: UserComponent }
        ])
      ],
      declarations: [
        AppComponent,
        ListComponent,
        UserComponent
      ]
    });
    TestBed.overrideComponent(ListComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ]
      }
    });
    TestBed.overrideComponent(UserComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ]
      }
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
  });

  it('navigate to "" redirects you to /list', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/list');
  }));

  it('navigate to "user/42" takes you to /user/42', fakeAsync(() => {
    router.navigate(['user/42']);
    tick();
    expect(location.path()).toBe('/user/42');
  }));

  it('click on name and route changes to /user/42',
    async(inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(ListComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();

    // Click on name
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/user/42');
      expect(component.columns.length).toEqual(4);
      expect(component.users.length).toEqual(1);
      console.log('after expect');
    });
  })));

  it('click on back and should go to list',
    async(inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(UserComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.user.username).toEqual('test');

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('');
      console.log('after expect');
    });
  })));
});
