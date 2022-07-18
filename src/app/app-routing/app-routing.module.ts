import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { ProductSingleComponent } from '../product-single/product-single.component';

import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ShopComponent } from '../shop/shop.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

import { AdminComponent } from '../admin/admin.component';
import { AdminLoginComponent } from '../admin/admin-login/admin-login.component';
import { MainComponent } from '../main/main.component';

const routes: Routes = [
  { path:"", component:MainComponent ,children: [
    { path:"", component:HomeComponent },
  { path:"product-single", component:ProductSingleComponent },
  { path:"cart", component:CartComponent },
  { path:"checkout", component:CheckoutComponent },
  { path:"shop", component:ShopComponent },
  { path:"dashboard", component:DashboardComponent },
  { path:"login", component:LoginComponent},
  { path:"register", component:RegisterComponent},
  ]},

  //::ToDo: Add guard
  { path:"admin", component:AdminComponent },
  { path:"admin-login", component:AdminLoginComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
