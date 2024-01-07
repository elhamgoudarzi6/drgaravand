import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from './../../../auth/token.service';
import { LayoutService } from '../../layout.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [MessageService]
})
export class UserInfoComponent implements OnInit {
  form: FormGroup | any;
  user: any;
  constructor(
    private router: Router,
    private service: LayoutService,
    private token: TokenService,
    private route: ActivatedRoute,
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
    this.service
      .updateUser(this.localStorage.userToken, this.localStorage.userID, this.form.value)
      .subscribe((response: any) => {
        if (response.success === true) {
          this.router.navigateByUrl('/order/orderinfo?id=' + this.route.snapshot.queryParamMap.get('id'));
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
