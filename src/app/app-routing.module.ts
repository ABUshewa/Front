import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {path:'Employees', component:EmployeeListComponent},
  {path:'Users', component:UserListComponent},
  {path:'Shops', component:ShopListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
