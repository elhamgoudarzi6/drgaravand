import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [MessageService]
})
export class AddOrderComponent implements OnInit {
  form: FormGroup | any;
  products: any[] = [];
  category: any[] = [];
  subCategory: any[] = [];
  units = [{ title: "گرم" }, { title: "مثقال" }, { title: "کیلوگرم" }, { title: "بسته" }, { title: "کارتن" }, { title: "کانتینر" }]

  constructor(
    private service: UserService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    private router: Router,
    public ref: DynamicDialogRef

  ) { }

  onSelectProduct(event: any) {
    this.form.controls.productID.setValue(event.value._id);
  }
  // onSelectCat(event: any) {
  //   this.service.getAllSubCategory(event.value).subscribe((response: any) => {
  //     if (response.success === true) {
  //       this.subCategory = response.data;
  //     } else {
  //     }
  //   });
  // }

  onSelectCat(event: any) {
    this.service.getAllProductByCat(event.value).subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
      }
    });
  }
  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.createForm();
      this.getProducts();
      this.getCategory();
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigateByUrl('/auth');
    }
  }

  createForm() {
    this.form = new FormGroup({
      userID: new FormControl(this.localStorage.userID),
      productID: new FormControl(null),
      title: new FormControl(null),
      number: new FormControl(null),
      unit: new FormControl(null),
      description: new FormControl(null),
      file: new FormControl(null),
    });
  }

  resetInput() {
    this.form.controls['productID'].reset();
    this.form.controls['title'].reset();
    this.form.controls['number'].reset();
    this.form.controls['description'].reset();
    this.form.controls['file'].reset();

  }

  getProducts() {
    this.service.getAllproduct().subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      } else {

      }
    });
  }

  submitForm(): void {
    this.service.registerOrder(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
        });
      }
    });
  }

  getCategory(): any {
    this.service.getAllCategories(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.category = response.data;
      } else {
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
