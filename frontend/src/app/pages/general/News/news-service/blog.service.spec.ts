/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BlogService } from './blog.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Service: Blog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should ...', inject([BlogService], (service: BlogService) => {
    expect(service).toBeTruthy();
  }));
});
