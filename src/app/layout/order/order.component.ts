import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-steps',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [MessageService]
})
export class OrderComponent implements OnInit {
  items: MenuItem[] | any;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'اطلاعات مشتری',
        icon: 'pi pi-user',
        routerLink: 'userinfo'
      },
      {
        label: 'فرم سفارش',
        icon: 'pi pi-shopping',
        routerLink: 'orderinfo'
      },
    ];
  }
}
