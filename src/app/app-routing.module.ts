import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressCreateComponent } from './components/address-create/address-create.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressEditComponent } from './components/address-edit/address-edit.component';
import { AddressSearchComponent } from './components/address-search/address-search.component';
import { AddressResultComponent } from './components/address-result/address-result.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search-address' },
  { path: 'create-address', component: AddressCreateComponent },
  { path: 'edit-address/:id', component: AddressEditComponent },
  { path: 'addresses-list', component: AddressListComponent },  
  { path: 'search-address', component: AddressSearchComponent }, 
  { path: 'address-result', component: AddressResultComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }