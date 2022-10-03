import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { TranslocoService } from '@ngneat/transloco';
import { EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { slideAll, slideLeft } from 'src/app/animations';
import { ApiService } from 'src/app/api-services/api.service';
import { Collections, HistoryProfile } from 'src/app/entities/collection';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'efpd-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [slideLeft, slideAll]
})
export class HistoryComponent implements OnInit {
  faLinkedin = faLinkedin;
  collection: Collections[] = [];
  history: Observable<HistoryProfile[]> = EMPTY;
  language?: string;

  constructor(
    private service: ApiService,
    private lang: LangService,
    private title: Title,
    private transloco: TranslocoService
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.transloco.translate('history.title') + ' | Erik Fernando Pérez Díaz');
    this.service.getCollection(2).pipe(take(1)).subscribe(c => this.collection = c);
    this.history = this.service.getHistory();
    this.lang.lang.pipe(take(1)).subscribe(l => this.language = l);
  }

  onLikeClicked(c: Collections): void {
    this.service.likeToCollection(c.id || 0).pipe(take(1)).subscribe(l => {
      this.service.getCollection(2).pipe(take(1)).subscribe(c => this.collection = c);
    });
  }

  onTrackCol = (index: number, item: Collections): any => item.id || 0;

  getCulture = (): string => this.lang.getCultureLang();

}
