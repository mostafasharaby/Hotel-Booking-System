/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterComponent } from './Footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



describe('Addition function', () => {
  let component: FooterComponent;
  let component2: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>
  beforeEach(() => {
    console.log('beforeEach: This runs before each test in the FooterComponent suite');
    // component = new FooterComponent();    // 1 -> without DI

    // component = TestBed.createComponent(FooterComponent).componentInstance;     // 2

    // component2 = jasmine.createSpyObj('FooterComponent', ['add','mulitply']);
    TestBed.configureTestingModule({   // 3
      providers:[FooterComponent] //  Angular registers it in the DI system
      // providers:[FooterComponent,{ 
      //   provide:FooterComponent, useValue: component2
    //  }]
    });
    component = TestBed.inject(FooterComponent) // without num 3 this will give (NullInjectorError)  as TestBed.inject(...) only works for classes that have been registered as providers in the testing module.


    // //4 -> like number 2 
    // fixture = TestBed.createComponent(FooterComponent);
    // component = fixture.componentInstance;
  });



  it('should return the sum of two numbers', () => {
    // const component = new FooterComponent;
    let result = component.add(5, 10);
    console.log("result", result, component)
    expect(result).toBe(15)

    // ✅spyOn Use Case: You want to watch (or replace) a method on an object
    // spyOn(component, 'add').and.callThrough();  
    // spyOn(component, 'add').and.callFake((a, b) => a + b); // setup spy with fake implementation
    // spyOn(component, 'add').and.returnValue(50);// setup spy
    // component.add(5, 10); // call the method
    // expect(component.add).toHaveBeenCalled();
    // expect(component.add).toHaveBeenCalledWith(5, 10);
    // expect(result).toBe(540);

    // ✅ createSpy Use Case: You want to create a standalone spy not attached to any object.
    // const spy = jasmine.createSpy('add');
    // spy(2, 4);
    // expect(spy).toHaveBeenCalledWith(2, 4);

    // ✅ createSpyObj Use Case: You want to create a fake object with multiple spies.
    // const fakeObj = jasmine.createSpyObj('FooterComponent', ['add', 'multiply']);
    // fakeObj.add.and.returnValue(15);
    // fakeObj.multiply.and.returnValue(50);
    // expect(fakeObj.add(5, 10)).toBe(15);
    // expect(fakeObj.multiply(5, 10)).toBe(50);
    // expect(fakeObj.add).toHaveBeenCalledWith(5, 10);
    // expect(fakeObj.multiply).toHaveBeenCalledWith(5, 10);

  });
});



// let count = 0;
// beforeEach(() => {
//   count = 1;
// });

// describe('Counter Tests', () => {
//   it('test 1', () => {
//     count += 1;
//     expect(count).toBe(2);
//   });

//   it('test 2', () => {
//     expect(count).toBe(1); // starts fresh again
//   });

// });