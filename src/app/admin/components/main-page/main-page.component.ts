import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { ApiAdminService } from '../../services/api-admin.service';
import { SpecialistRegistrationComponent } from '../specialist-registration/specialist-registration.component';

const SPEC_REG_PATH = 'admin/specialist-registration';
const REP_DOWN_PATH = 'admin/report-download';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public subpages = [
    { name: 'Zarejestrowani użytkownicy', path: 'admin/users' },
    { name: 'Prośby o zostanie moderatorem forum', path: 'admin/moderator-requests' },
    { name: 'Rejestracja specjalisty', path: SPEC_REG_PATH },
    { name: 'Zgłoszone posty', path: 'admin/post-report' },
    { name: 'Newsletter', path: 'admin/newsletter' },
    { name: 'Pobierz raport', path: REP_DOWN_PATH },
    { name: 'Wydarzenia', path: 'events' }
  ];
  
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, public dialog: MatDialog, private apiAdminService: ApiAdminService) { }

  public ngOnInit(): void {
  }

  public navigateToSubpage(path: string): void {
    if (path === SPEC_REG_PATH) {
      this.openDialog();
    } else if (path === REP_DOWN_PATH) {
      this.subscription = this.apiAdminService.getReport().subscribe(response => {
        const blob: Blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'raport.xlsx');
      });
    } else {
      this.router.navigate([path]);
    }
  }

  public openDialog(): void {
    this.dialog.open(SpecialistRegistrationComponent, {
      data: {},
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
