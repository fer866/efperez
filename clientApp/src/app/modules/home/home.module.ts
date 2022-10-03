import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslocoModule } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    TranslocoModule,
    MatTooltipModule,
    MatRippleModule
  ]
})
export class HomeModule { }
