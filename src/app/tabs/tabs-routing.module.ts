import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,

    children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
      { path: 'mystory', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },// list of all buyed history by the user
      { path: 'cart', loadChildren: () => import('../card/card.module').then(m => m.CardPageModule) },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
