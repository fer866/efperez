import { Injectable } from '@angular/core';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private readonly _key: string = '_clng';
  private _lang = new BehaviorSubject<string>('en');
  private _culture = new BehaviorSubject<string>('en-US');
  lang = this._lang.asObservable();
  culture = this._culture.asObservable();

  constructor(private transloco: TranslocoService) { }

  getInitialLang(): string {
    let lang = atob(localStorage.getItem(this._key) || '');
    if (!lang) {
      lang = getBrowserLang() === 'es' ? 'es' : 'en';
    }
    this.transloco.setActiveLang(lang);
    this._lang.next(lang);
    this._culture.next(lang === 'es' ? 'es-MX' : 'en-US');
    return lang;
  }

  changeLang(lang: 'es' | 'en'): void {
    const curLang = atob(localStorage.getItem(this._key) || '');
    if (curLang && curLang === this.transloco.getActiveLang()) {
      localStorage.removeItem(this._key);
    } else {
      localStorage.setItem(this._key, btoa(lang));
    }
    this.transloco.setActiveLang(lang);
    this._lang.next(lang);
    this._culture.next(lang === 'es' ? 'es-MX' : 'en-US');
  }

  currentLang = (): string => this.transloco.getActiveLang();

  getCultureLang = (): string => {
    const lang = atob(localStorage.getItem(this._key) || '');
    if (lang) {
      return lang === 'es' ? 'es-MX' : 'en-US';
    } else {
      return getBrowserLang() === 'es' ? 'es-MX' : 'en-US';
    }
  }

}
