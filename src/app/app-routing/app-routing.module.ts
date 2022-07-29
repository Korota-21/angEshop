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
import { ViewProductAdminComponent } from '../admin/view-product-admin/view-product-admin.component';
import { EditProductComponent } from '../admin/edit-product/edit-product.component';
import { WishListComponent } from '../components/wish-list/wish-list.component';

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      { path: "", component: HomeComponent },
      { path: "product-single/:id", component: ProductSingleComponent },
      { path: "cart", component: CartComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "shop", component: ShopComponent },
      {
        path: "dashboard", component: DashboardComponent
      },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
    ]
  },

  // admin routes
  {
    path: "admin", canActivate: [AdminAuthGuard], component: AdminComponent, children: [
      { path: ':id', component: ViewProductAdminComponent },
      { path: 'update/:id', component: EditProductComponent }

    ]
  },
  { path: "admin-login", component: AdminLoginComponent },

  { path: '**', redirectTo: '/', pathMatch: 'full' },

];
@NgModule({
  providers: [AuthService, AdminAuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
