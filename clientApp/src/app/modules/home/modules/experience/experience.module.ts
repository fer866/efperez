import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceComponent } from './experience.component';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    MatIconModule,
    FontAwesomeModule,
    MatCardModule,
    MatRippleModule,
    MatTooltipModule,
    SharedModule,
    TranslocoModule
  ]
})
export class ExperienceModule { }
