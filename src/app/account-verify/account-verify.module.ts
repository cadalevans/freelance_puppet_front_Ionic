import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountVerifyPageRoutingModule } from './account-verify-routing.module';

import { AccountVerifyPage } from './account-verify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountVerifyPageRoutingModule
  ],
  declarations: [AccountVerifyPage]
})
export class AccountVerifyPageModule {}
