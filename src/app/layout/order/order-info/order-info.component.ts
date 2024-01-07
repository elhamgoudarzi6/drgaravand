import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../../layout.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-order',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  providers: [MessageService]
})

export class OrderInfoComponent {
  form: FormGroup | any;
  products: any[] = [];
  messages: Message[] | any;
  units = [{ title: "گرم" }, { title: "مثقال" }, { title: "کیلوگرم" }, { title: "بسته" }, { title: "کارتن" }, { title: "کانتینر" }]
  errorMessages = {
    title: [{ type: 'required', message: ' عنوان را وارد کنید.' }],
  };
  displayCustom: boolean | any;
  activeIndex: number = 0;

  constructor(
    private service: LayoutService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.createForm();
      this.getProducts();
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigateByUrl('/auth');
    }

  }

  createForm() {
    this.form = new FormGroup({
      userID: new FormControl(this.localStorage.userID),
      productID: new FormControl(this.route.snapshot.queryParamMap.get('id')),
      title: new FormControl(null),
      number: new FormControl(1),
      unit: new FormControl(null),
      description: new FormControl(null),
      file: new FormControl(null),
    });
  }

  resetInput() {
    // this.form.controls['productID'].reset();
    this.form.controls['title'].reset();
    this.form.controls['number'].reset();
    this.form.controls['description'].reset();
    this.form.controls['file'].reset();

  }

  getProducts() {
    this.service.getAllproduct().subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
        console.log(this.products);

      } else {

      }
    });
  }

  submitForm(): void {
    this.service.registerOrder(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'سفارش شما ثبت شد',
        });
        this.resetInput();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
        });
      }
    });
  }

  onFileUpload(event: any) {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
      .uploadFile(formData)
      .subscribe((response: any) => {
        if (response.success === true) {
          this.form.controls.file.setValue(response.imagePath);
          this.messageService.add({
            severity: 'success',
            summary: 'آپلود فایل',
            detail: 'آپلود شد.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'آپلود فایل',
            detail: response.data,
          });
        }
      });
  }

}
