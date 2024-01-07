import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from './home/hero/hero.component';
import { LoginComponent } from './login/login.component';
import { ServiceComponent } from './home/service/service.component';
import { AboutComponent } from './home/about/about.component';
import { PrimengListModule } from '../primeng-list.module';
import { ContactComponent } from './home/contact/contact.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FaqComponent } from './home/faq/faq.component';
import { GalleryComponent } from './home/gallery/gallery.component';
import { BlogComponent } from './home/blog/blog.component';
//import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    LoginComponent,
    ServiceComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    GalleryComponent,
    BlogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengListModule,
    HttpClientModule,
    //NgPersianDatepickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'fa'
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class LayoutModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}