import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeMx);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { LangService } from './services/lang.service';
import { CustomInterceptor } from './interceptors/custom.interceptor';
import { TranslocoService } from '@ngneat/transloco';
import { preloadLang } from './transloco/transloco-config';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    TranslocoRootModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [
    { provide: APP_INITIALIZER, multi: true, useFactory: preloadLang, deps: [LangService, TranslocoService] },
    { provide: LOCALE_ID, useFactory: (langService: LangService) => langService.getCultureLang(), deps: [LangService] },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'MXN' },
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
