import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})

export class AddressListComponent implements OnInit {
  
  Address:any = [];

  constructor(private apiService: ApiService) { 
    this.readAddress();
  }

  ngOnInit() {}

  readAddress(){
    this.apiService.getAddresses().subscribe((data) => {
     this.Address = data;
    })    
  }

  removeAddress(address, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteAddress(address._id).subscribe((data) => {
          this.Address.splice(index, 1);
        }
      )    
    }
  }
}
