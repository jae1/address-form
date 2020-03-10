import { ApiService } from '../../service/api.service';
import { Component, Input, Output, EventEmitter, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Address } from '../../model/Address';
import { stringify } from 'querystring';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css']
})

export class AddressSearchComponent implements OnInit {
  form: FormGroup;
  model: any;
  fields: FormlyFieldConfig[];
  submitted = false;
  result: object;
  Address: any = [];

  constructor(
    private apiService: ApiService,
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.http.get<any>(`assets/json-schema/Countries.json`).pipe(
      tap(({ schema, model }) => {
        this.form = new FormGroup({});
        this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        this.model = model;
      }),
    ).subscribe();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      return false;
    } else {
      let params = new URLSearchParams();
      for (let key in this.form.value.address) {
        if (this.form.value.address[key] != null) {
          params.set(key, this.form.value.address[key]);
        }
      }

      this.apiService.searchAddress(params.toString())
        .subscribe((res: Response) => {
          this.result = res;
          // this.apiService.searchResults = res; 
          console.log('res: ' + res);
          console.log('result: ' + this.result);
          this.router.navigateByUrl('/address-result');
        }, (error) => {
          console.log(error)
        })
    }
  }
}
