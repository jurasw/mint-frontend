import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface IActivity {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-mint-activities',
  templateUrl: './mint-activities.component.html',
  styleUrls: ['./mint-activities.component.scss']
})
export class MintActivitiesComponent implements OnInit {
  @Input() public activities: IActivity[] = [
    {
      title: 'Do poczytania',
      description: 'Artykuły, forum, porady',
      image: '/assets/images/home-page/do-poczytania.svg'
    },
    {
      title: 'Na żywo',
      description: 'Spotkania z grupami, szkolenia, wykłady',
      image: '/assets/images/home-page/na-żywo.svg'
    },
    {
      title: 'Samopoznanie',
      description: 'Test psychologiczny, omówienie wyników, zalecenia',
      image: '/assets/images/home-page/samopoznanie.svg'
    },
    {
      title: 'Pomoc',
      description: 'Konsultacja, rozmowy online, psychoterapia indywidualna',
      image: '/assets/images/home-page/pomoc.svg'
    }
  ];
  constructor(public router: Router) { }

  public ngOnInit(): void {
  }

}
