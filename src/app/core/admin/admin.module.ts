import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { AdminRoutingModule } from './admin-routing.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AdministratorAddComponent } from './administrators/administrator-add/administrator-add.component';
import { AdministratorEditComponent } from './administrators/administrator-edit/administrator-edit.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqAddComponent } from './faqs/faq-add/faq-add.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    AdministratorsComponent,
    AdministratorAddComponent,
    AdministratorEditComponent,
    FaqsComponent,
    FaqAddComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengListModule,
    MatrialListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
