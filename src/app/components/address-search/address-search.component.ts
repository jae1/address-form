import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css']
})
export class AddressSearchComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  Address: any = [];

  constructor(
    private apiService: ApiService,
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.http.get<any>(`assets/json-schema/CountrySchema.json`).pipe(
      tap(({ schema, model }) => {
        // this.type = 'oneOf';
        this.form = new FormGroup({});
        this.options = {};
        this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        this.model = model;
      }),
    ).subscribe(jsonSchema => {console.log(jsonSchema)});
  }

  readAddress(){
    this.apiService.getAddresses().subscribe((data) => {
     this.Address = data;
    })    
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      return false;
    } else {
      this.apiService.getAddresses()
      .subscribe(res => {
        this.router.navigateByUrl('/address-list');
        console.log('Loaded')
      }, (error) => {
        console.log(error)
      })
    }
    alert(JSON.stringify(this.model));
  }
}
