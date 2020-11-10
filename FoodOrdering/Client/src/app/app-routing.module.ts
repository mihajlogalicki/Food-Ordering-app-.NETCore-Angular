import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

// Importing commponents for routing
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden/forbidden.component';
import { OrderComponent } from './orders/order/order.component';
import { LoginComponent } from './user/login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  // Default route
  {path: '', redirectTo: '/user/login', pathMatch: 'full'},
  {
    path: 'user', component: UserComponent, 
      children: [
        {path: 'registration', component: RegistrationComponent}, // ->  /user/registration
        {path: 'login', component: LoginComponent} // ->  /user/login
    ]
  },
  {path: 'home', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'adminpanel', component: AdminPanelComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] }},
  {path: 'orders', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
