import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/main/home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { ProductSingleComponent } from '../components/product-single/product-single.component';

import { CartComponent } from '../components/cart/cart.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { ShopComponent } from '../components/shop/shop.component';
import { DashboardComponent } from '../components/main/dashboard/dashboard.component';
import { LoginComponent } from '../components/main/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

import { AdminComponent } from '../admin/admin.component';
import { AdminLoginComponent } from '../admin/admin-login/admin-login.component';
import { MainComponent } from '../components/main/main.component';
import { AuthService } from '../services/auth/auth.service';
import { AdminAuthGuard } from '../guards/admin-auth/admin-auth.guard';

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
  { path:"admin", canActivate:[AdminAuthGuard], component:AdminComponent },
  { path:"admin-login", component:AdminLoginComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },

];
@NgModule({
  providers: [AuthService,AdminAuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
