import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatIconModule,
    FontAwesomeModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
    SharedModule,
    TranslocoModule
  ]
})
export class AboutModule { }
