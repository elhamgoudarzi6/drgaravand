import { Component } from '@angular/core';
import { LayoutService } from './../../layout.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [MessageService],
})
export class ContactComponent {
  form: FormGroup | any;
  errorMessages = {
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
    ],
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید' },
    ],
    email: [
      { type: 'required', message: 'آدرس پست الکترونیکی را وارد کنید.' },
      { type: 'email', message: 'آدرس پست الکترونیکی را صحیح وارد کنید.' },
    ],
    title: [{ type: 'required', message: 'عنوان پیام را وارد کنید.' }],
    message: [{ type: 'required', message: 'متن پیام را وارد کنید.' }],
  };

  constructor(
    private service: LayoutService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createform();
  }

  createform() {
    this.form = new FormGroup({
      fullName: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      mobile: new FormControl(null, Validators.compose([Validators.required])),
      title: new FormControl(null, Validators.compose([Validators.required])),
      message: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  sendMessage() {
    this.service.addContactMessage(this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'ثبت شد',
        });
        this.resetInput();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'ثبت نشد',
          detail: response.data,
        });
      }
    });
  }


  resetInput() {
    this.form.controls['fullName'].reset();
    this.form.controls['mobile'].reset();
    this.form.controls['email'].reset();
    this.form.controls['title'].reset();
    this.form.controls['message'].reset();
  }
}
