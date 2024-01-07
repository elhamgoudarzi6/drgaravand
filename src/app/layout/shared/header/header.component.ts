import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ViewportScroller } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LayoutService } from './../../layout.service';
import { LocalStorageService } from './../../../auth/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  items: MenuItem[] | any;
  display = false;

  constructor(
    private localStorage: LocalStorageService,
    private service: LayoutService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    public translate: TranslateService) {
  }


  ngOnInit(): void {

    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        command: () => this.onClick('hero')
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-fw pi-question-circle',
        command: () => this.onClick('faq')
      },
      {
        label: 'گالری',
        icon: 'pi pi-fw pi-images',
        command: () => this.onClick('gallery')
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-fw pi-info-circle',
        command: () => this.onClick('about')
      },
      {
        label: 'تماس با ما',
        icon: 'pi pi-fw pi-phone',
        command: () => this.onClick('contact')
      },
    ];
    var pc = window.document.getElementById('scroll')!;
    var pcSticky = 0;
    if (pc !== null) {
      pcSticky = pc.offsetTop;
    }
    window.addEventListener('scroll', scroll, true);
    function scroll() {
      if (pc !== undefined) {
        if (window.pageYOffset > pcSticky) {
          pc.classList.add('sticky');
        } else {
          pc.classList.remove('sticky');
        }
      }
    }
  }

  showMenu(): void {
    this.display = true;
  }

  onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    if (this.display === true) {
      this.display = false;
    }
  }

}
