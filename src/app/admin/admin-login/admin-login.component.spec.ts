import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminLoginComponent } from './admin-login.component';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLoginComponent],
      imports: [HttpClientTestingModule,FormsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponent);
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
