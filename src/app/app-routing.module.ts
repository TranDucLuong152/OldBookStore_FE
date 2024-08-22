import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { ProductDateilsComponent } from './product-dateils/product-dateils.component';
import { AddProductComponent } from './add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PayComponent } from './pay/pay.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { UserGuard } from './user.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent ,canActivate: [AuthGuard]},
  { path: 'pay', component: PayComponent, canActivate: [UserGuard]},
  { path: 'category/:id', component: ProductsComponent },
  { path: 'search/:keyword', component: ProductsComponent },
  { path: 'products/:bookid', component: ProductDateilsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo:'/home',pathMatch:"full"},
  { path: '**', redirectTo:'/home',pathMatch:"full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
