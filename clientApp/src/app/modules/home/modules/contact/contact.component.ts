import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';
import { ApiService } from 'src/app/api-services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'efpd-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    comment: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(300)])
  });

  constructor(
    private service: ApiService,
    private snack: SnackbarService,
    private transloco: TranslocoService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.transloco.translate('contact.title') + ' | Erik Fernando Pérez Díaz');
  }

  onSubmit(form: FormGroupDirective): void {
    if (this.contact.invalid) {
      this.contact.markAsTouched();
      this.contact.markAsDirty();
      return;
    }
    const value = this.contact.value;
    this.contact.disable();
    this.service.sendComments(value).pipe(take(1)).subscribe(s => {
      this.contact.enable();
      form.resetForm();
      this.contact.reset();
      this.snack.open(s.message);
    }, e => this.contact.enable());
  }

}
