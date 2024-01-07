import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
Injectable()
export class Globals {
  constructor(private router: Router,
    public translate: TranslateService) {
    translate.addLangs(['fa', 'en', 'ru', 'ar']);
    translate.setDefaultLang('fa');
  }
  lang = 'fa';
  switchLanguage(lang: any) {
    this.translate.use(lang);
    this.lang = lang;
    // this.state = {
    //   'lang': this.currentLang,
    // }
  }
}