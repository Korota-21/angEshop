import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

// import Validation from './utils/validation';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(Number),
    availability: new FormControl(true),
  });
  file: File|null = null; // Variable to store file

  colors = [
    'red',
    'blue',
    'black',
    'yellow',
  ]
  tags = ["top", "bottom", "children", "men", "women"]
  productColors: string[] = [];
  productTags: string[] = [];
  submitted = false;
  onChange(event:any) {
    if (event.target.files[0].type.includes("image"))
    this.file = event.target.files[0];

console.log(this.file);

}
  constructor(private formBuilder: FormBuilder, private _productService: ProductService,) {
  }


  colorsForm!: FormGroup;
  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      image:[File, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: [0, Validators.required],
      availability: [true, ],
    })
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
      price:this.productForm.controls.price.value,
      quantity: this.productForm.controls.quantity.value,
      colors: this.productColors,
      tags: this.productTags,
      availability:  this.productForm.controls.availability.value,
    }
    console.log(product)
    this.createProduct(product);
  }
  createProduct(product:any): void {
    this._productService.createProduct(product,this.file!).subscribe(
      product => console.log("Product created", product),
      err => console.log("Error creating", err));
      ()=>this._productService.updateProductList()
  }
}
