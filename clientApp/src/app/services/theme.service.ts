import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly _key: string = '_theme';
  private _isDark = new BehaviorSubject<boolean>(this.isDarkSelected());
  isDark = this._isDark.asObservable();

  constructor(private breakpoin: BreakpointObserver) { }

  isAutomatic = (): boolean => !localStorage.getItem(this._key);

  private isDarkSelected(): boolean {
    const val = atob(localStorage.getItem(this._key) || '');
    if (val) {
      return val === 'true' ? true : false;
    }
    return false;
  }

  setDark(val: boolean): void {
    this.breakpoin.observe('(prefers-color-scheme: dark)').pipe(take(1), map(b => b.matches)).subscribe(d => {
      if (d === val) {
        localStorage.removeItem(this._key);
      } else {
        localStorage.setItem(this._key, btoa(val.toString()));
      }
      this._isDark.next(val);
    });
  }
}
