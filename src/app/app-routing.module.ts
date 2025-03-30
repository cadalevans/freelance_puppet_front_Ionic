import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'account-verify',
    loadChildren: () => import('./account-verify/account-verify.module').then( m => m.AccountVerifyPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'history-detail/:id',
    loadChildren: () => import('./history-detail/history-detail.module').then( m => m.HistoryDetailPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'mystory',
    loadChildren: () => import('./mystory/mystory.module').then( m => m.MystoryPageModule)
  },
  {
    path: 'stripe-success',
    loadChildren: () => import('./stripe-success/stripe-success.module').then( m => m.StripeSuccessPageModule)
  },
  {
    path: 'stripe-payment/:userId/:totalPrice',
    loadChildren: () => import('./stripe-payment/stripe-payment.module').then( m => m.StripePaymentPageModule)
  },
  {
    path: 'paypal-payment/:userId',
    loadChildren: () => import('./paypal-payment/paypal-payment.module').then( m => m.PaypalPaymentPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
