import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from './../../../auth/token.service';
import { UserService } from '../user.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {
  form: FormGroup | any;
  constructor(
    private router: Router,
    private service: UserService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.createForm();
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigateByUrl('/auth');
    }
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(this.localStorage.userMobile),
      fullName: new FormControl(this.localStorage.userFullName),
      email: new FormControl(this.localStorage.userEmail),
      country: new FormControl(this.localStorage.userCountry),
      city: new FormControl(this.localStorage.userCity),
      address: new FormControl(this.localStorage.userAddress),
      birthDate: new FormControl(this.localStorage.userBirthDate),
      companyName: new FormControl(this.localStorage.userCompanyName),
    });
    this.form.controls.mobile.disable();
  }

  submitForm(): void {
    this.service.updateUser(this.localStorage.userToken, this.localStorage.userID, this.form.value)
      .subscribe((response: any) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' ثبت شد ',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

}
