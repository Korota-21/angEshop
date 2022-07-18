import { NgModule } from '@angular/core';
import { ProductSingleComponent } from '../product-single/product-single.component';
import { HomeComponent } from '../home/home.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:"", component:HomeComponent },
  { path:"product-single", component:ProductSingleComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
