import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ViewProductAdminComponent } from './view-product-admin.component';

describe('ViewProductAdminComponent', () => {
  let component: ViewProductAdminComponent;
  let fixture: ComponentFixture<ViewProductAdminComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  const ActivatedRouteSpy = {
    snapshot: {
      paramMap: convertToParamMap({
        some: 'some',
        else: 'else',
      })
    },
    queryParamMap: of(
      convertToParamMap({
        some: 'some',
        else: 'else',
      })
    ),
    params: of({ id: 'testABC' })


  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProductAdminComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: ActivatedRouteSpy },
      ],
      imports: [HttpClientTestingModule,]

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
