import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})

export class FaqComponent implements OnInit {
  faqs: any[] = [];
  lang: any;
  constructor(
    private service: LayoutService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs() {
    this.service.getFaqs().subscribe((response: any) => {
      if (response.success === true) {
        this.faqs = response.data;
      } else {
        console.log('eror')
      }
    });
  }

}
