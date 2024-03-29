import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private userType: any;
  private accessLevel: any;
  result: boolean = false;
  title: any;

  constructor(private localstorage: LocalStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.localstorage.getCurrentUser() === true) {
      this.userType = this.localstorage.userJson['type'];
      if (this.userType === 'admin') {
        this.router.navigate(['/panel']);
      }
    }
    this.router.navigate(['/']);
    return false;
  }

}

