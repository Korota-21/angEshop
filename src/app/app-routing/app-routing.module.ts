import { NgModule } from '@angular/core';
import { ProductSingleComponent } from '../product-single/product-single.component';
import { HomeComponent } from '../home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ShopComponent } from '../shop/shop.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [
  { path:"", component:HomeComponent },
  { path:"product-single", component:ProductSingleComponent },
  { path:"cart", component:CartComponent },
  { path:"checkout", component:CheckoutComponent },
  { path:"shop", component:ShopComponent },
  { path:"dashboard", component:DashboardComponent },
  { path:"login", component:LoginComponent},
  { path:"register", component:RegisterComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
