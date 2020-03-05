import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormlyFormOptions, FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css'],

})

export class AddressCreateComponent implements OnInit {

  // jsonFormObject: any;
  // submitted = false;
  // addressForm: FormGroup;

  // constructor(
  //   public fb: FormBuilder,
  //   private router: Router,
  //   private ngZone: NgZone,
  //   private apiService: ApiService,
  //   private http: HttpClient,
  //   private formlyJsonSchema: FormlyJsonschema
  // ) {}

  // ngOnInit() {
  //   this.http
  //   .get<FormlyFieldConfig[]>('/assets/CountrySchema.json')
  //   .subscribe(jsonSchema => {
  //     const formlyConfig = this.formlyJsonSchema.toFieldConfig(jsonSchema);
  //     this.orderFields = jsonSchema;
  //   })
  // }
  
  // orderForm = new FormGroup({});
  // order = {
  //   tagName: '',
  //   color: 'powder-blue', // will default to this value
  //   quantity: 1,
  //   size: 'M',
  //   terms: false
  // }
  // orderFields: FormlyFieldConfig[] = [
    
  // ];

  // onSubmit({valid, orderInfo}) {
  //   console.log(orderInfo);
  // }

  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  type: string;

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient,
  ) {
  }
  ngOnInit() {}

  loadExample(type: string) {
    this.http
      .get<any>(`assets/CountrySchema.json`).pipe(
        tap(({ schema, model }) => {
          this.type = type;
          this.form = new FormGroup({});
          this.options = {};
          this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
          this.model = model;
        }),
      )
      .subscribe();
  }

  submit() {
    alert(JSON.stringify(this.model));
  }
}
