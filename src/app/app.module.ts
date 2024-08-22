import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BooksService } from './services/books.service';
import { ContensHomeComponent } from './templates/contens-home/contens-home.component';
import { BackgrondComponent } from './templates/backgrond/backgrond.component';
import { ContenSalesComponent } from './templates/conten-sales/conten-sales.component';
import { FooterComponent } from './footer/footer.component';
import { IntroduceComponent } from './templates/introduce/introduce.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDateilsComponent } from './product-dateils/product-dateils.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from './services/cart.service';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from './AuthInterceptor';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth-service.service';
import { PayComponent } from './pay/pay.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContensHomeComponent,
    BackgrondComponent,
    ContenSalesComponent,
    FooterComponent,
    IntroduceComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    ContactComponent,
    AccountComponent,
    CartComponent,
    ScrollToTopComponent,
    LoginComponent,
    RegisterComponent,
    ProductDateilsComponent,
    AddProductComponent,
    PayComponent,
    AdminComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [BooksService,CartService,AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
