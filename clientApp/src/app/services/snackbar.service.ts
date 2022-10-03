import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snack: MatSnackBar,
    private theme: ThemeService,
    private transloco: TranslocoService
  ) { }

  open(message: string, action?: string, noLimit?: boolean): void {
    this.theme.isDark.pipe(take(1)).subscribe(d => {
      const custAction = action ?? this.transloco.translate('discard');
      const cssClass: string | undefined = d ? 'snack-dark' : undefined;
      const duration = noLimit ? undefined : 7000;
      this.snack.open(message, custAction, { duration: duration, panelClass: cssClass });
    });
  }
}
