import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductAdminComponent } from './view-product-admin.component';

describe('ViewProductAdminComponent', () => {
  let component: ViewProductAdminComponent;
  let fixture: ComponentFixture<ViewProductAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
