import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule,FormsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('component initial state', () => {
    expect(component.email).toBeUndefined();
    expect(component.password).toBeUndefined();
    expect(component.err).toBeFalsy();
    expect(component.errMessage).toEqual("");
  });
  it('should be print "All Field are required" when submit with undefined email or password', () => {
    component.submitted();
    expect(component.err).toBeTruthy();
    expect(component.errMessage).toEqual("All Field are required");
  });
  it('err should be false when submit with valid user', () => {
    component.email = "user@user.com"
    component.password = "password"
    component.submitted();
    expect(component.err).toBeFalse();
    expect(component.errMessage).toEqual("");

  });
});
