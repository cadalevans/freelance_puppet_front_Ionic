import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardPageRoutingModule } from './card-routing.module';

import { CardPage } from './card.page';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardPageRoutingModule,
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    provideLottieOptions({ player: () => player })
  ],
  declarations: [CardPage]
})
export class CardPageModule {}
