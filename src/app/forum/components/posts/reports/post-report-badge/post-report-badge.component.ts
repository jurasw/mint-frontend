import { Component, Input, OnInit } from '@angular/core';
import { IReport, IReportInfo } from 'src/app/forum/models/report.interface';
import { ReportService } from 'src/app/forum/services/report.service';
import { IUser } from 'src/app/_core/models/user.interface';
import { ReportsLogicDirective } from '../reports.logic';

@Component({
  selector: 'app-post-report-badge',
  templateUrl: './post-report-badge.component.html',
  styleUrls: ['./post-report-badge.component.scss'],
})
export class PostReportBadgeComponent
  extends ReportsLogicDirective
  implements OnInit
{
  @Input() public postAuthor!: IUser;
  @Input() public postReports: IReport[] = [];
  public message!: IReportInfo;
  constructor(protected reportService: ReportService) {
    super(reportService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.message = this.getReportInformation(this.postReports);
  }
}
