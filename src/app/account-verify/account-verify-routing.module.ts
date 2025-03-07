import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountVerifyPage } from './account-verify.page';

const routes: Routes = [
  {
    path: '',
    component: AccountVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountVerifyPageRoutingModule {}
