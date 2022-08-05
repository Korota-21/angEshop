import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

import { EditProductComponent } from './edit-product.component';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  const formBuilder: FormBuilder = new FormBuilder();
  const ActivatedRouteSpy = {
    params: of(
      {
        id: 'some',
      }
    )
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductComponent], providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute,   useValue: ActivatedRouteSpy    },

        { provide: FormBuilder, useValue: formBuilder },

      ],
      imports: [HttpClientTestingModule]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
