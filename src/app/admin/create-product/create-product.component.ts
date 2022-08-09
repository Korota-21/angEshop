import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;

  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(Number),
    availability: new FormControl(true),
  });
  file: File | null = null; // Variable to store file

  colors = this._productService.colorsList;
  tags = this._productService.tagsList;
  productColors: string[] = [];
  productTags: string[] = [];
  submitted = false;

  constructor(private formBuilder: FormBuilder, private _productService: ProductService) {
  }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      image: [File, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      // colors: [],
      tags: [],
      quantity: [0, Validators.required],
      availability: [true,],
    })
  }
  onChange(event: any) {
    if (event.target.files[0].type.includes("image"))
      this.file = event.target.files[0];
  }
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onChangeColor(name: string, ev: any) {
    if (ev.checked) {
      this.productColors.push(name);
    } else {
      this.productColors = this.productColors.filter(c => c !== name)
    }
  }
  onChangeTag(name: string, ev: any) {
    if (ev.checked) {
      this.productTags.push(name);
    } else {
      this.productTags = this.productTags.filter(c => c !== name)
    }
  }
  submit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    let product =
    {
      name: this.productForm.controls.name.value,
      description: this.productForm.controls.description.value,
      price: this.productForm.controls.price.value,
      quantity: this.productForm.controls.quantity.value,
      colors: this.productColors,
      tags: this.productTags,
      availability: this.productForm.controls.availability.value,
    }
    this.createProduct(product);
  }
  createProduct(product: any): void {
    this._productService.createProduct(product, this.file!).subscribe(
      product => { this._productService.updateProductList() },
      err => console.log("Error creating", err))
  }

  reset() {
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.productForm.updateValueAndValidity();
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }
}
