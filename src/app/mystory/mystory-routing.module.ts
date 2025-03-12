import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MystoryPage } from './mystory.page';

const routes: Routes = [
  {
    path: '',
    component: MystoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MystoryPageRoutingModule {}
