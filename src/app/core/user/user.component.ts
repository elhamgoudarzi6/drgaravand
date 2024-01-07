import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  mobile: any;
  items: MenuItem[];
  image: any;
  fullName: any;
  showFiller = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private localStorage: LocalStorageService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private service: UserService
  ) {
    this.items = [
      {
        label: 'داشبورد',
        icon: 'pi pi-home',
        routerLink: '/user',
      },
      {
        label: 'لیست سفارشات',
        icon: 'pi pi-shopping-bag',
        routerLink: '/user/order',
      },
      {
        label: 'ویرایش اطلاعات',
        icon: 'pi pi-user-edit',
        routerLink: '/user/users',
      }
    ];
  }


  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser() || this.localStorage.userType != 'user') {
      this.router.navigateByUrl('/auth');
    }
    this.fullName = this.localStorage.userFullName;
    this.image = this.localStorage.userImage;
    this.mobile = this.localStorage.userMobile;
  }

  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/auth');
  }
}
