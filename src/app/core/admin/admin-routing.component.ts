import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from 'src/app/auth/auth-guard';
const routes: Routes = [
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'users',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
      },
    ],
  },

  {
    path: 'faqs',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: FaqsComponent,
      },
    ],
  },
  {
    path: 'contact',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: ContactComponent,
      },
    ],
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'config',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdministratorsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }