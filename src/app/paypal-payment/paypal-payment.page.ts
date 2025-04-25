import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaypalService } from '../paypal.service';
import { Browser } from '@capacitor/browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { App } from '@capacitor/app';


@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.page.html',
  styleUrls: ['./paypal-payment.page.scss'],
  standalone: false
})
export class PaypalPaymentPage implements OnInit {

  constructor(private paypalService: PaypalService, 
    private route: ActivatedRoute,
    private userService: UserService,
    private toastCtrl: ToastController,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }

  userId = this.userService.getUserId();

  async ngOnInit() {
  this.listenForAppUrlOpen();
  await this.payWithPaypal();
  this.cdRef.detectChanges();
  }
  

 async payWithPaypal() {
  this.paypalService.createPayment(this.userId).subscribe(async (response: any) => {
    if (response.approvalUrl) {
      // Open the approval Url inside Webview
        //await window.open(response.approvalUrl, '_system');// This opens PayPal in the in-app browser
      await Browser.open({ url: response.approvalUrl });
    } else {
      this.showToast('Error: Could not get PayPal approval URL');
    }
  }, error => {
    this.showToast('Payment request failed: ' + JSON.stringify(error));
  });
  }


  listenForAppUrlOpen() {
    App.addListener('appUrlOpen', async (event) => {
      const url = event.url;
      console.log('App opened with URL:', url);
      // why do all this ? it's because paypal couldn't redirect to a link that couldn't be accessed publicly 

      if (url.startsWith('freelance_puppet://paypal-success')) {
        const params = new URLSearchParams(url.split('?')[1]);
        const paymentId = params.get('paymentId');
        const payerId = params.get('PayerID');
        const token = params.get('token');
        const userId = params.get('userId');

        if (paymentId && payerId && token && userId) {
          // Send data to backend to validate the payment
          this.paypalService.executePayment(paymentId, payerId, token, this.userId).subscribe(async () => {
            this.showToast('✅ Payment Successful!');
          }, error => {
            this.showToast('❌ Payment Execution Failed.');
          });
        }
      }
    });
  }


  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }

  goBack() {
    this.router.navigate(['tabs/home']);
  }


}
