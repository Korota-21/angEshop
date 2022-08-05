import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProductSingleComponent } from './product-single.component';
import { ProductService } from 'src/app/services/product/product.service';

describe('ProductSingleComponent', () => {
  let component: ProductSingleComponent;
  let fixture: ComponentFixture<ProductSingleComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  const productService = jasmine.createSpyObj<ProductService>(['getProduct'])
  productService.getProduct.and.returnValue(of({
    _id: '',
    image: '',
    name: '',
    description: '',
    price: '',
    quantity: 5,
    colors: [''],
    tags: [''],
    availability: true,
    createdAt: '',
    updatedAt: '',
  }));
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
    params: of(
      {
        id: 'some',
      }
    )
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSingleComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteSpy },
        { provide: productService, useValue: productService },

        // { provide: Router, useValue: routerSpy }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
