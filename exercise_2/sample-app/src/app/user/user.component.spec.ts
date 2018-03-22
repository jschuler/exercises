// import { Component } from '@angular/core';
// import { Router, Routes, ActivatedRoute, convertToParamMap } from '@angular/router';
// import { By } from '@angular/platform-browser';
// import { Location, CommonModule } from '@angular/common';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TestBed, inject, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';

// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';

// import { UserComponent } from './user.component';
// import { UserService } from '../user.service';
// import { User } from '../user';

// class MockUserService {
//   users = [{
//     id: 42,
//     name: 'Test User',
//     username: 'test',
//     email: 'test@email',
//     website: 'test web',
//     phone: '123-456'
//   }];

//   getUsers(): Observable<User[]> {
//     return of(this.users);
//   }
// }

// class MockActivatedRoute {
//   snapshot = {
//     paramMap: {
//       get: function() {
//         return 42;
//       }
//     }
//   };
// }

// describe('UserComponent', () => {
//   let component: UserComponent;
//   let fixture: ComponentFixture<UserComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         CommonModule,
//         RouterTestingModule.withRoutes([
//           { path: '', redirectTo: '/list', pathMatch: 'full' },
//           { path: 'user/:id', component: UserComponent }
//         ])
//       ],
//       declarations: [ UserComponent ]
//     })
//     .compileComponents();

//     TestBed.overrideComponent(UserComponent, {
//       set: {
//         providers: [
//           { provide: UserService, useClass: MockUserService },
//           { provide: ActivatedRoute, useClass: MockActivatedRoute }
//         ]
//       }
//     });
//   }));

//   // beforeEach(() => {
//   //   fixture = TestBed.createComponent(UserComponent);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
//   it('click on back and should go to list',
//     async(inject([Router, Location], (router: Router, location: Location) => {

//     let fixture = TestBed.createComponent(UserComponent);
//     let component = fixture.componentInstance;
//     fixture.detectChanges();

//     expect(component.user.username).toEqual('test');

//     fixture.debugElement.query(By.css('button')).nativeElement.click();
//     fixture.whenStable().then(() => {
//       expect(location.path()).toEqual('');
//       console.log('after expect');
//     });
//   })));
// });
