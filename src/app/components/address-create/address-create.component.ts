import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Address } from '../../model/Address';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css'],
})

export class AddressCreateComponent implements OnInit {
  form: FormGroup;
  model: Address;
  fields: FormlyFieldConfig[];
  submitted = false;

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadForm()
  }

  loadForm() {
    this.http.get<any>(`assets/json-schema/Countries.json`).pipe(
      tap(({ schema, model }) => {
        // this.type = 'oneOf';
        this.form = new FormGroup({});
        this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        this.model = model;
      }),
    ).subscribe();
  }

  submit() {
    alert(JSON.stringify(this.model));
    this.submitted = true;
    if (!this.form.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this.apiService.createAddress(this.form.value)
          .subscribe(res => {
            this.router.navigateByUrl('/addresses-list');
            console.log('Content Created Successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
}