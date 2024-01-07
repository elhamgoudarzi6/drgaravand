import { Component } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { TokenService } from './../../../auth/token.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from './../../../auth/local-storage.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [MessageService, ConfirmationService],

})
export class GalleryComponent {
  displayCustom: boolean = false;

  activeIndex: number = 0;

  images: any[] = [];

responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: '992px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  constructor(
    private messageService: MessageService,
    private service: LayoutService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.images = [
      { url: '../../../../assets/images/clinic1.jpg' },
      { url: '../../../../assets/images/clinic2.jpg' },
      { url: '../../../../assets/images/clinic2.jpg' },
      { url: '../../../../assets/images/clinic2.jpg' },
      { url: '../../../../assets/images/clinic2.jpg' },
      { url: '../../../../assets/images/clinic2.jpg' },
      { url: '../../../../assets/images/clinic2.jpg' },
      { url: '../../../../assets/images/clinic2.jpg' },
    ];
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }


  getGallery() {
    this.service.getGallery().subscribe((response: any) => {
      if (response.success === true) {
        this.images = response.data;
        console.log(this.images);
        
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

}