import { Component, OnInit } from '@angular/core';
import { IMedia } from 'src/app/components-deprecated/footer/models/media';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() { }

  public ngOnInit(): void { }

  public socialMedia: IMedia[] = [
    {
      url: 'https://www.facebook.com/portalMINT',
      picUrl: 'facebook-brands.svg',
    },
    {
      url: 'https://www.instagram.com/mintmint.pl/',
      picUrl: 'instagram-brands.svg',
    },
    {
      url: 'https://www.linkedin.com/company/81422089/',
      picUrl: 'linkedin-brands.svg',
    },
    {
      url: 'https://twitter.com/MintMintPortal',
      picUrl: 'twitter-brands.svg',
    },
  ];

  public toTheTop(): void {
    window.scrollTo({ top: 0 });
  }

  public btnClick(link: string) {
    window.open(link);
  }
}
