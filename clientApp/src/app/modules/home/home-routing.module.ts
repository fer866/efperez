import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'about',
        loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule),
        data: { b: 'about' }
      },
      { 
        path: 'experience',
        loadChildren: () => import('./modules/experience/experience.module').then(m => m.ExperienceModule),
        data: { b: 'experience' }
      },
      {
        path: 'history',
        loadChildren: () => import('./modules/history/history.module').then(m => m.HistoryModule),
        data: { b: 'history' }
      },
      {
        path: 'contact',
        loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule),
        data: { b: 'contact' }
      },
      { path: '', redirectTo: '/home/about', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
