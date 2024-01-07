import { TokenService } from '../../../auth/token.service';
import { AddOrderComponent } from './add-order/add-order.component';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { UserService } from '../user.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  cols: any[] | any;

  constructor(
    private messageService: MessageService,
    private service: UserService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
  ) { }
  
  ngOnInit(): void {
    this.getOrders();
    this.cols = [
      { field: 'code', header: 'کد سفارش' },
      { field: 'title', header: 'عنوان' },
      { field: 'number', header: 'تعداد' },
      { field: 'description', header: 'توضیحات' },
      { field: 'status', header: 'وضعیت سفارش' },
    ];
  }

  getOrders(): any {
    this.service.getAllOrderByUser(this.localStorage.userToken, this.localStorage.userID).subscribe((response: any) => {
      if (response.success === true) {
        this.orders = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  showAddOrderDialog(): void {
    const ref = this.dialogService.open(AddOrderComponent, {
      header: 'ثبت سفارش جدید',
      width: '95%',
      style: { "font-family": "IRANSans_Light" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'با موفقیت ثبت شد.',
        });
        this.getOrders();
      }
    });
  }

}
