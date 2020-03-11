import { ApiService } from '../../service/api.service';
import { Component, Input, Output, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-address-result',
  templateUrl: './address-result.component.html',
  styleUrls: ['./address-result.component.css']
})
export class AddressResultComponent implements OnInit {
  searchedResults: any = [];

  constructor(
    private apiService: ApiService,
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { this.readData() }
  ngOnInit() { }
  readData() {
    // this.searchedResults = this.apiService.searchResults;
    console.log('Result ' + JSON.stringify(this.searchedResults));
  }
}