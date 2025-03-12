import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MystoryPageRoutingModule } from './mystory-routing.module';

import { MystoryPage } from './mystory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MystoryPageRoutingModule
  ],
  declarations: [MystoryPage]
})
export class MystoryPageModule {}
