import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressCreateComponent } from './components/address-create/address-create.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressEditComponent } from './components/address-edit/address-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-address' },
  { path: 'create-address', component: AddressCreateComponent },
  { path: 'edit-address/:id', component: AddressEditComponent },
  { path: 'addresses-list', component: AddressListComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }