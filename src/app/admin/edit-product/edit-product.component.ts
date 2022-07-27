import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;
  product!: IProduct;
  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(Number),
    availability: new FormControl(true),
  });
  colors = this._productService.colorsList;
  tags = this._productService.tagsList;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private _activateRoute: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router) {
  }

  ngOnInit(): void {
    this.getProduct();

  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onChangeColor(name: string, ev: any) {
    if (ev.checked) {
      this.product.colors.push(name);
    } else {
      this.product.colors = this.product.colors.filter(c => c !== name)
    }
  }
  onChangeTag(name: string, ev: any) {
    if (ev.checked) {
      this.product.tags.push(name);
    } else {
      this.product.tags = this.product.tags.filter(c => c !== name)
    }
  }
  submit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.product.name= this.productForm.controls.name.value;
    this.product.description= this.productForm.controls.description.value;
    this.product.price= this.productForm.controls.price.value;
    this.product.quantity= this.productForm.controls.quantity.value;
    this.product.tags= this.productForm.controls.tags.value;
    this.product.colors= this.productForm.controls.colors.value;
    this.product.availability= this.productForm.controls.availability.value;

    this.updateProduct();
  }
  updateProduct(): void {
    this._productService.updateProduct(this.product).subscribe(
      product => { this._productService.updateProductList() },
      err => console.log("Error updating", err))
  }


  getProduct() {
    this._activateRoute.params.subscribe((params) => {

      this._productService.getProduct(params['id']).subscribe(
        product => {
          if (!product)
            this._router.navigate(['/admin']);
          this.product = product
          this.setFormValues()
        },
        err => console.log(err)
      );
    })
  }
  setFormValues(){
    this.productForm = this.formBuilder.group({
      image: [File, Validators.required],
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      price: [this.product.price, Validators.required],
      quantity: [this.product.quantity, Validators.required],
      colors: [this.product.colors],
      tags: [this.product.tags],
      availability: [this.product.availability,],
    })
  }
}
