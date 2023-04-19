import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface IUserRecommend {
  photo: string;
  name: string;
  age: number;
  description: string;
}

@Component({
  selector: 'app-user-recommends',
  templateUrl: './user-recommends.component.html',
  styleUrls: ['./user-recommends.component.scss']
})
export class UserRecommendsComponent implements OnInit {
  public userRecommends: IUserRecommend[] = [
    {
      photo: '/assets/images/home-page/senior_woman_1.png',
      name: 'Wanda',
      age: 60,
      description: 'Trafiłam tu z polecenia. Moja koleżanka wspomniała, że jest taki portal MINT dla osób 50+, którym warto się zainteresować. Zachęciła mnie tym, że można spotkać tu ciekawych, dojrzałych ludzi, którzy myślą podobnie jak my. \n To naprawdę fajnie, że ktoś pomyślał o nas w tak ciekawy sposób i zrobił coś dla seniorów. Poczułam się tu dobrze. Czuję się sobą, zyskałam możliwość otwarcia się i porozmawiania o waznych dla mnie sprawach. Polecam.',
    },
    {
      photo: '/assets/images/home-page/senior_man_2.png',
      name: 'Ryszard K',
      age: 65,
      description: 'Szukałem ciekawych stron w internecie, które przedstawiają treści skierowane do mojej grupy wiekowej. Trochę to trwało, lecz w końcu udało mi się trafić na MINT. Zorientowałem się, że jest to strona o nas i dla nas. \n Często tu zaglądam. Mogę nie tylko poczytać o sprawach naszego pokolenia, ale również o nich porozmawiać, gdyś są prowadzone ciekawe spotkania w formie wideo. Dobrze, że powstała taka strona, jak MINT. Czasu nie zatrzymamy, a tu jakby czas stanął w miejscu.',
    },
    {
      photo: '/assets/images/home-page/senior_woman_3.png',
      name: 'Katarzyna',
      age: 67,
      description: 'W Mint szczczególnie zainteresowały mnie treści psychologiczne. W dziejszym zagonionym świecie mają one dla mnie szczególne znaczenie. Ważna jest też atmosfera, która tu panuje. \n Czuje się tu mile widziana i w pełni akceptowana. Odnoszę wrażenie, że komuś na mnie zależy i czuje się, że życiem można cieszyć sie w każdym wieku. Fajnie, że jesteście. Pozdrawiam Was i będę polecała tę stronę znajomym.',
    }
  ];

  public visibleUserRecommends: IUserRecommend[] = [];
  private _slideIndex = 0;

  constructor(public router: Router) { }

  public ngOnInit(): void {
    this.visibleUserRecommends = this.userRecommends.slice(0, 3);
  }

  public slide(state: boolean): void {
    if (state) {
      this._slideIndex++;
      if (this._slideIndex > this.userRecommends.length - 1) {
        this._slideIndex = 0;
      }
    } else {
      this._slideIndex--;
      if (this._slideIndex < 0) {
        this._slideIndex = this.userRecommends.length - 1;
      }
    }
    this.visibleUserRecommends = this.userRecommends.slice(this._slideIndex, this._slideIndex + 3);
    if (this.visibleUserRecommends.length < 3) {
      this.visibleUserRecommends.push(...this.userRecommends.slice(0, 3 - this.visibleUserRecommends.length));
    }
  }
}
