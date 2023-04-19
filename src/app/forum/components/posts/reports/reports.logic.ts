import { Directive, OnInit } from '@angular/core';
import {
  IReport,
  IReportInfo,
  IReportResponse
} from 'src/app/forum/models/report.interface';
import { ReportService } from 'src/app/forum/services/report.service';
import { DEFAULT_PAGINATION } from 'src/app/_core/constants/pagination.constant';
import { groupBy } from 'src/app/_core/functions/groupBy.function';
import {
  IPagination,
  IPaginationData
} from 'src/app/_core/models/pagination.model';
import { IUser } from 'src/app/_core/models/user.interface';

@Directive()
export class ReportsLogicDirective implements OnInit {
  public reports: IReport[] = [];
  public isLoading = false;
  public messages: IReportInfo[] = [];
  public forumId!: number;
  public pagination: IPagination = {...DEFAULT_PAGINATION};
  public paginationData!: IPaginationData;
  constructor(protected reportService: ReportService) {}

  public ngOnInit(): void {}

  protected setMessages(reports: IReport[]): IReportInfo[] {
    const messages: IReportInfo[] = [];
    const groupedReports = groupBy(reports, (item) => item.postId);
    for (const i of Object.values(groupedReports)) {
      messages.push(this.getReportInformation(i));
    }
    return messages;
  }

  protected getPostReports(forumId: number): void {
    this.reports = [];
    this.isLoading = true;
    this.reportService.getUserReports(forumId, this.pagination).subscribe(
      (data: IReportResponse & IPaginationData) => {
        this.reports = data.items;
        this.paginationData = data;
        this.messages = this.setMessages(this.reports);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  protected filterReportsByPost(postId: number, reports: IReport[]): IReport[] {
    return reports.filter((report) => report.postId === postId);
  }

  protected getReportInformation(postReports: IReport[]): IReportInfo | any {
    const numberOfUsers = postReports.length;
    let messageWithCounter = '';
    let message = '';
    const users: IUser[] = [];
    if (!numberOfUsers) {
      return;
    } else if (numberOfUsers === 1) {
      users.push(postReports[0].user);
      message = postReports[0].user.nickName + ' zgłosił(a) ';
    } else {
      const lastDigit = numberOfUsers % 10;
      postReports.forEach((report, index) => {
        users.push(report.user);
        message +=
          report.user.nickName +
          (index !== postReports.length - 1 ? ', ' : ' ');
      });
      message += ' zgłosili ';
      messageWithCounter = numberOfUsers + '';
      switch (lastDigit) {
        case 2:
        case 3:
        case 4:
          messageWithCounter += ' osoby zgłosiły ';
          break;
        default:
          messageWithCounter += ' osób zgłosiło ';
      }
    }
    const postMessage =
      (postReports[0].post.postRef === 1
        ? 'wątek #' + postReports[0].post.forumThread.id
        : 'komentarz #' + postReports[0].post.postRef) +
      ' użytkownika ' +
      postReports[0].post.author.nickName;
    message += postMessage;

    if (messageWithCounter) {
      messageWithCounter += postMessage;
    }
    return {
      message,
      messageWithCounter: messageWithCounter ? messageWithCounter : undefined,
      users,
      reports: postReports,
      post: postReports[0].post,
      status: postReports[0].status,
    };
  }
}
