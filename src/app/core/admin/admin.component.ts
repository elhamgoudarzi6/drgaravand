import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: MenuItem[];
  display = true;
  image: any;
  fullName: any;
  sidebarVisible: boolean = false;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private service: AdminService
  ) {
    this.items = [
      {
        label: 'داشبورد',
        icon: 'pi pi-home',
        routerLink: '/admin/panel',
      },
      {
        label: 'کاربران',
        icon: 'pi pi-users',
        routerLink: '/admin/users',
      },
      {
        label: 'مدیریت پیام ها',
        icon: 'pi pi-comments',
        routerLink: '/admin/contact',
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-question-circle',
        routerLink: '/admin/faqs',
      },
      {
        label: 'مدیران',
        icon: 'pi pi-database',
        routerLink: '/admin/config',
      },
    ];
  }
  
  changeVisible() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser() || this.localStorage.userType != 'admin') {
      this.router.navigateByUrl('/admin');
    }
    this.image = this.localStorage.userImage;
    this.fullName = this.localStorage.userFullName;
  }

  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/admin');
  }



}
