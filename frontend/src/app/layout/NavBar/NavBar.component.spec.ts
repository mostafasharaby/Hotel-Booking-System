import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './NavBar.component';
import { AuthServiceService } from '../../pages/auth/auth-services/auth-service.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// describe('NavBarComponent', () => {
//   let component: NavBarComponent;
//   let fixture: ComponentFixture<NavBarComponent>;
//   let mockService: jasmine.SpyObj<AuthServiceService>;

//   beforeEach(async () => {
//     // Step 1: Create the mock with the methods you need
//     mockService = jasmine.createSpyObj('AuthServiceService', [], { isLoggedIn: of(true) });

//     // Step 2: Mock the return value (observable from BehaviorSubject)
//     // mockService.isUserLoggedIn.and.returnValue(of(true)); // ✅ simulate logged in

//     await TestBed.configureTestingModule({
//       declarations: [NavBarComponent],
//       providers: [
//         { provide: AuthServiceService, useValue: mockService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(NavBarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // run ngOnInit
//   });

//   it('should show user as logged in', () => {
//     expect(component.isLoggedIn).toBeTrue();
//     expect(mockService.isUserLoggedIn).toHaveBeenCalled();
//   });
// });
