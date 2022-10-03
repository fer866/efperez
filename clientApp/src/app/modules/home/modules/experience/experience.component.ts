import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';
import { fadeIn, slideAll, slideLeft } from 'src/app/animations';
import { ApiService } from 'src/app/api-services/api.service';
import { GithubRepo, GroupExperience } from 'src/app/entities/collection';

@Component({
  selector: 'efpd-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [slideLeft, slideAll, fadeIn]
})
export class ExperienceComponent implements OnInit {
  faGithub = faGithub;
  repos: GithubRepo[] = [];
  experience: GroupExperience[] = [];

  constructor(
    private service: ApiService,
    private title: Title,
    private transloco: TranslocoService
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.transloco.translate('experience.title') + ' | Erik Fernando Pérez Díaz');
    this.service.getGithubRepos().pipe(take(1)).subscribe(g => this.repos = g);
    this.service.getExperience().pipe(take(1)).subscribe(e => this.experience = e);
  }

}
