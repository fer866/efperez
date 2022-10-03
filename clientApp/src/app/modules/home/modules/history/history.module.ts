import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTooltipModule,
    SharedModule,
    TranslocoModule
  ]
})
export class HistoryModule { }
