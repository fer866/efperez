import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { fade } from 'src/app/animations';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'efpd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fade]
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  darkToggle = new FormControl(false);

  constructor(
    private theme: ThemeService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.theme.isDark.pipe(takeUntil(this.unsubscribe$), delay(1)).subscribe(d => this.darkToggle.setValue(d));
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.b;
  }

  onThemeChange(): void {
    this.theme.setDark(this.darkToggle.value);
  }

}
