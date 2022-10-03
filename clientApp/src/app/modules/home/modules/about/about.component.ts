import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';
import { slideLeft } from 'src/app/animations';
import { ApiService } from 'src/app/api-services/api.service';
import { Collections } from 'src/app/entities/collection';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'efpd-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [slideLeft]
})
export class AboutComponent implements OnInit {
  faTwitter = faTwitter;
  hobbys: Collections[] = [];
  readonly tweetDate: Date = new Date(2021,7,14,12,17);

  constructor(
    private service: ApiService,
    private lang: LangService,
    private title: Title,
    private transloco: TranslocoService
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.transloco.translate('about.title') + ' | Erik Fernando Pérez Díaz');
    this.getCollection();
  }

  private getCollection(): void {
    this.service.getCollection(1).pipe(take(1)).subscribe(c => this.hobbys = c);
  }

  onLikeCollection(c: Collections): void {
    this.service.likeToCollection(c.id || 0).pipe(take(1)).subscribe(c => this.getCollection());
  }

  hobbysTrackBy = (index: number, item: Collections): any => item.id || 0;

  getCulture = (): string => this.lang.getCultureLang();

  get developer(): number {
    const today = new Date();
    const begin = new Date(2015,8,16);
    const years = today.getFullYear() - begin.getFullYear();
    if (today.getMonth() <= 8 && today.getDay() < 15) {
      return years - 1;
    } else {
      return years;
    }
  }

}
