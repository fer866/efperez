import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { LangService } from '../services/lang.service';
import { TranslocoService } from '@ngneat/transloco';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(
    private snackbar: SnackbarService,
    private langService: LangService,
    private transloco: TranslocoService,
    private loader: LoaderService
  ) {}

  private setContentLang(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Content-Language': this.langService.getCultureLang()
      }
    });
  }

  private handleResponseError(error: HttpErrorResponse, request?: HttpRequest<any>, next?: HttpHandler): any {
    switch (error.status) {
      case 400:   //Bussiness Error
        this.snackbar.open(error.error?.message ?? this.transloco.translate('error'));
        break;
      case 403:   //Access Denied
        this.snackbar.open(this.transloco.translate('denied'));
        break;
      case 404:   //Not found
        this.snackbar.open(this.transloco.translate('not_found'));
        break;
      case 429:   //Too Many Attemps
        this.snackbar.open(this.transloco.translate('tooManyAttemps'));
        break;
      case 500:   //Internal Server Error
        this.snackbar.open(this.transloco.translate('error'));
        break;
      case 503:   //Maintenance Error
        this.snackbar.open(this.transloco.translate('maintenance'));
        break;
      default:
        this.snackbar.open(this.transloco.translate('error'));
        break;
    }
    return throwError(error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.setContentLang(request);
    return next.handle(request).pipe(
      finalize(() => this.loader.change(false)),
      catchError(error => {
        return this.handleResponseError(error, request, next);
      })
    );
  }
}
