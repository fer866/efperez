import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { ThemeService } from './services/theme.service';
import { BreakpointObserver } from "@angular/cdk/layout";
import { filter, map, takeUntil } from "rxjs/operators";
import { fade } from './animations';
import { LangService } from './services/lang.service';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'efpd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  @HostBinding('class.dark-theme') isDarkTheme: boolean = false;
  lang: string = 'en';
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  readonly today: Date = new Date(Date.now());
  
  constructor(
    private theme: ThemeService,
    private loader: LoaderService,
    private router: Router,
    private breakpoint: BreakpointObserver,
    private langService: LangService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    //Set Active Language
    this.langService.lang.pipe(takeUntil(this.unsubscribe$)).subscribe(l => this.lang = l);

    //Lazy loading routes
    this.router.events.pipe(
      filter(e => e instanceof RouteConfigLoadStart || e instanceof RouteConfigLoadEnd),
      takeUntil(this.unsubscribe$)
    ).subscribe(e => {
      if (e instanceof RouteConfigLoadStart) {
        this.loader.change(true);
      } else if (e instanceof RouteConfigLoadEnd) {
        this.loader.change(false);
      }
    });

    //Scheme color change
    this.breakpoint.observe('(prefers-color-scheme: dark)').pipe(
      takeUntil(this.unsubscribe$), map(m => m.matches)
    ).subscribe(c => {
      if (this.theme.isAutomatic()) {
        this.isDarkTheme = c;
        this.theme.setDark(c);
      }
    });

    this.theme.isDark.pipe(takeUntil(this.unsubscribe$)).subscribe(d => this.isDarkTheme = d);
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.a;
  }

  changeLang(lang: 'es' | 'en'): void {
    this.langService.changeLang(lang);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
