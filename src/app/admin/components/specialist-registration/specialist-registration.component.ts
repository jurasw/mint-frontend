import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { VALIDATORS } from 'src/app/_core/constants/validations.constant';
import { ApiAdminService } from '../../services/api-admin.service';

@Component({
  selector: 'app-specialist-registration',
  templateUrl: './specialist-registration.component.html',
  styleUrls: ['./specialist-registration.component.scss']
})
export class SpecialistRegistrationComponent implements OnInit, OnDestroy {
  public specializations$ = new Observable<string[]>();
  public isLoading = false;
  public specialistForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.pattern(VALIDATORS.email)]),
    login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    specialization: new FormControl('Psycholog')
  });
  private subscription: Subscription = new Subscription();

  constructor(
    private apiAdminService: ApiAdminService,
    public dialogRef: MatDialogRef<SpecialistRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  public ngOnInit(): void {
    this.isLoading = true;
    this.specializations$ = this.apiAdminService.getSpecializations().pipe(tap(() => this.isLoading = false));
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    if (this.specialistForm.valid) {
      this.subscription = this.apiAdminService.registerSpecialist(this.specialistForm.value).subscribe();
      this.dialogRef.close();
    } else {
      this.specialistForm.markAllAsTouched();
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
