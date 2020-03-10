import { Address } from '../../model/Address';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../service/api.service';

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})

export class AddressEditComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  model: any;
  fields: FormlyFieldConfig[];

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getAddress(id);
  }

  // Getter to access form control
  get myForm() {
    return this.form.controls;
  }

  getAddress(id) {
    this.apiService
      .getAddress(id)
      .subscribe(data => {
        this.form
          .setValue({
            address1: data['address1'],
            address2: data['address2'],
            address3: data['address3'],
            locale: data['locale'],
            region: data['region'],
            postalCode: data['postalCode'],
            country: data['country']
          });
      });
  };

  loadForm() {
    this.http
      .get<any>(`assets/json-schema/Countries.json`)
      .pipe(
        tap(({ schema, model }) => {
          this.form = new FormGroup({});
          this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
          this.model = model;
        }),
      ).subscribe(jsonSchema => {
        console.log(jsonSchema)
      });
  };

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateAddress(id, this.form.value)
          .subscribe(res => {
            this.router.navigateByUrl('/addresses-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
}