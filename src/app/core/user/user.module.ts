import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.component';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { UserComponent } from './user.component';
import { UsersComponent } from './users/users.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './order/add-order/add-order.component';

@NgModule({
  declarations: [
    DashboardComponent,
     UserComponent,
     UsersComponent,
     OrderComponent,
     AddOrderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimengListModule,
    MatrialListModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule { }
