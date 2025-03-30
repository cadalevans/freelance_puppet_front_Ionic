import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.page.html',
  styleUrls: ['./stripe-payment.page.scss'],
  standalone: false
})
export class StripePaymentPage implements OnInit {
  userId: number;
  clientSecret!: string;
  stripePublishableKey = environment.stripePublishableKey;
  totalPrice: number = 0;
  paymentIntentId: any;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,

  ) {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.totalPrice = Number(this.route.snapshot.paramMap.get('totalPrice'))
  }


  async ngOnInit() {

    await this.loadStripe();
    await this.initiatePayment();
  }

  async loadStripe() {
    await Stripe.initialize({
      publishableKey: this.stripePublishableKey,
    });
  }

  async initiatePayment() {
    const loading = await this.loadingCtrl.create({ message: 'Processing Payment...' });
    await loading.present();
  
    const platform = Capacitor.getPlatform();
    console.log("Platform detected:", platform);
  
    let clientType = 'web'; 
    if (platform === 'android') {
      clientType = 'android';
    } else if (platform === 'ios') {
      clientType = 'ios';
    }
  
    this.http.post(`${environment.apiUrl}/api/stripe/transactions/${this.userId}`, {})
      .subscribe(async (res: any) => {
        loading.dismiss();
  
        if (res.checkoutUrl) {
          // ✅ Immediately redirect to Stripe Checkout
          await Browser.open({url: res.checkoutUrl})
        } else {
          await this.showToast('Failed to get the checkout URL.');
        }
  
      }, async (err) => {
        console.error(err);
        await this.showToast('Failed to initiate payment.');
        loading.dismiss();
      });
  }
  
  
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }
  
  goBack() {
    this.router.navigate(['tabs/cart']);
  }

}

/*

  async setupPaymentSheet() {
    try {
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: this.clientSecret,
        merchantDisplayName: 'My Awesome SaaS',
      });
    } catch (error) {
      console.error('Failed to create payment sheet:', error);
      await this.showToast('Failed to prepare payment sheet.');
    }
  }

  async payNow() {
    const loading = await this.loadingCtrl.create({ message: 'Opening Payment Modal...' });
    await loading.present();
  
    try {
      // ✅ Step 1: Set up the Payment Sheet with clientSecret
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: this.clientSecret,
        merchantDisplayName: 'My Awesome SaaS',
      });
  
      // ✅ Step 2: Open the Payment Modal
      const result = await Stripe.presentPaymentSheet();
  
      // ✅ Step 3: Handle Payment Results
      if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
        await this.finalizePayment();
      } else if (result.paymentResult === PaymentSheetEventsEnum.Canceled) {
        await this.showToast('Payment canceled. Please try again.');
      } else {
        await this.showToast('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      await this.showToast('Payment modal failed.');
    }
  
    loading.dismiss();
  }
  

  async finalizePayment() {
    const loading = await this.loadingCtrl.create({ message: 'Finalizing Payment...' });
    await loading.present();
  
    
    this.http.post(`${environment.apiUrl}/api/stripe/payment-success/${this.paymentIntentId}/${this.userId}`, {})
      .subscribe((res: any) => {
        if (res === "Payment successfully processed.") {
          this.showToast('Payment Successful! ✅');
          this.router.navigate(['/stripe-success']);
        } else {
          this.showToast('Payment not confirmed.');
        }
      }, async (err) => {
        console.error(err);
        await this.showToast(err);
      });
  
    loading.dismiss();
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }

  goBack() {
    this.router.navigate(['tabs/cart']);
  }
}




// This initiate payment was good if i use SDK but to Apple policy i need to remove it 
/*  async initiatePayment() {
  const loading = await this.loadingCtrl.create({ message: 'Processing Payment...' });
  await loading.present();

  const platform = Capacitor.getPlatform(); // ✅ Get platform name
    console.log("Platform detected:", platform);

  // ✅ Detect platform (web, android, ios)
    let clientType = 'web'; // Default to web
    if (platform === 'android') {
      clientType = 'android';
    } else if (platform === 'ios') {
      clientType = 'ios';
    }

  this.http.post(`${environment.apiUrl}/api/stripe/transactions/${this.userId}/${clientType}`, {})
    .subscribe((res: any) => {
      this.clientSecret = res.clientSecret;  // ✅ Corrected: Use clientSecret, not paymentId
      this.totalPrice;
      this.paymentIntentId = res.paymentIntentId;

      console.log('PaymentIntent ID:', res.paymentIntentId);
      console.log('Client Type:', clientType);
      console.log('Client Secret:', this.clientSecret);
      console.log('total Amount', this.totalPrice)

      if (!this.clientSecret) {
        console.error('Error: No Client Secret received.');
        this.showToast('Error: Payment setup failed.');
        loading.dismiss();
        return;
      }

      // ✅ Automatically prepare the Payment Sheet after fetching the clientSecret
      this.setupPaymentSheet();

      loading.dismiss();
    }, async (err) => {
      console.error(err);
      await this.showToast('Failed to initiate payment.');
      loading.dismiss();
    });
}
    */