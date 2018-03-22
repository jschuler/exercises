import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { UserService } from './user.service';

describe('UserService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [UserService]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('url should be set', inject([UserService], (service: UserService) => {
    expect(service.url).toEqual('http://jsonplaceholder.typicode.com/users');
  }));
});
