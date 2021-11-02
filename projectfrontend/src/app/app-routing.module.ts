import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminprofileComponent } from './pages/admin/adminprofile/adminprofile.component';
import { AllproductsComponent } from './pages/public/allproducts/allproducts.component';
import { NotebooksComponent } from './pages/public/notebooks/notebooks.component';
import { SmartphonesComponent } from './pages/public/smartphones/smartphones.component';
import { CartComponent } from './pages/user/cart/cart.component';
import { ChangepasswordComponent } from './pages/user/changepassword/changepassword.component';
import { LoginComponent } from './pages/user/login/login.component';
import { MyordersComponent } from './pages/user/myorders/myorders.component';
import { OrderComponent } from './pages/user/order/order.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { RegisterComponent } from './pages/user/register/register.component';

const routes: Routes = [
  {path:"", component:AllproductsComponent},
  {path:"noteboks", component:NotebooksComponent},
  {path:"smartphones", component:SmartphonesComponent},
  {path:"user" ,children:[
    {path:"register", component:RegisterComponent},
    {path:"login", component:LoginComponent},
    {path:"profile", component:ProfileComponent},
    {path:"changepass", component:ChangepasswordComponent},
    {path:"cart", component:CartComponent},
    {path:"order", component:OrderComponent},
    {path:"myorders", component:MyordersComponent},
  ]},
  {path:"admin" ,children:[
    {path:"profile", component:AdminprofileComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
