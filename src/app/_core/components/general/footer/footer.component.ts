import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ILink } from 'src/app/components-deprecated/footer/models/link';
import { IMedia } from 'src/app/components-deprecated/footer/models/media';
import { ContactAdvertisingModalComponent } from '../../modals/contact-advertising-modal/contact-advertising-modal.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public currentYear: number = new Date().getFullYear();
  public footerLinks: ILink[] = [
    {
      name: 'Polityka prywatności',
      filePath: '../../../../assets/files/privacy_policy.pdf',
    },
    {
      name: 'Regulamin',
      filePath: '../../../../assets/files/terms_and_conditions.pdf',
    },
    {
      name: 'Cookie',
      filePath: '../../../../assets/files/privacy-policy-cookies.pdf',
    },
  ];
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
  constructor(public router: Router, public dialog: MatDialog) {}

  public ngOnInit(): void {}

  public clickFooterItem(link: ILink): void {
    if (link) {
      if (link.filePath) {
        window.open(link.filePath);
      }
      if (link.action) {
        link.action();
      }
    }
  }

  public scrollUp(): void {
    window.scrollTo({ top: 0 });
  }

  public openContactAdvertising(): void {
    this.dialog.open(ContactAdvertisingModalComponent, {});
  }
}