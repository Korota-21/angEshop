import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';

import { ShopComponent } from './shop.component';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  const ActivatedRouteSpy = {
    queryParams: of(
     {
        some: 'some',
        else: 'else',
     })
  };
  const ProductServiceSpy = jasmine.createSpyObj<ProductService>(['getProductList'])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopComponent ],
      providers: [
        // Subscription,
        { provide: ActivatedRoute,   useValue: ActivatedRouteSpy    },
        // { provide: ProductService,   useValue:  ProductServiceSpy   },

        { provide: Router, useValue: routerSpy }
      ],
      imports: [HttpClientTestingModule,]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
