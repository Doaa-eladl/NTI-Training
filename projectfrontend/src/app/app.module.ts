import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllproductsComponent } from './pages/public/allproducts/allproducts.component';
import { SmartphonesComponent } from './pages/public/smartphones/smartphones.component';
import { NotebooksComponent } from './pages/public/notebooks/notebooks.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { DataService } from './services/data.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { ChangepasswordComponent } from './pages/user/changepassword/changepassword.component';
import { AdminprofileComponent } from './pages/admin/adminprofile/adminprofile.component';
import { CartComponent } from './pages/user/cart/cart.component';
import { OrderComponent } from './pages/user/order/order.component';
import { MyordersComponent } from './pages/user/myorders/myorders.component';
import { AddnewproductComponent } from './pages/admin/addnewproduct/addnewproduct.component';
import { ShowsingleproductComponent } from './pages/admin/showsingleproduct/showsingleproduct.component';
import { ShowallcartsComponent } from './pages/admin/showallcarts/showallcarts.component';
import { ShowallordersComponent } from './pages/admin/showallorders/showallorders.component';

@NgModule({
  declarations: [
    AppComponent,
    AllproductsComponent,
    SmartphonesComponent,
    NotebooksComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ChangepasswordComponent,
    AdminprofileComponent,
    CartComponent,
    OrderComponent,
    MyordersComponent,
    AddnewproductComponent,
    ShowsingleproductComponent,
    ShowallcartsComponent,
    ShowallordersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
