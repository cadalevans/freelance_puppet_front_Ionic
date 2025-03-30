import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { flatMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stripe-success',
  templateUrl: './stripe-success.page.html',
  styleUrls: ['./stripe-success.page.scss'],
  standalone: false
})
export class StripeSuccessPage implements OnInit {

  paymentIntentId: string = '';
  paymentStatus: string = 'Processing Payment...';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    this.paymentIntentId = this.route.snapshot.queryParamMap.get('payment_intent') || '';
    if (this.paymentIntentId) {
      await this.finalizePayment();
    } else {
      this.paymentStatus = 'Payment Failed';
      await this.showToast('Payment ID not found.');
    }
  }

  async finalizePayment() {
    const loading = await this.loadingCtrl.create({ message: 'Finalizing Payment...' });
    await loading.present();

    this.http.post(`${environment.apiUrl}/api/stripe/payment-success/${this.paymentIntentId}`, {})
      .subscribe(async () => {
        this.paymentStatus = 'Payment Successful! ✅';
        await this.showToast('Payment successfully confirmed.');
      }, async (err) => {
        console.error(err);
        this.paymentStatus = 'Payment Failed';
        await this.showToast('Failed to confirm payment.');
      }).add(() => loading.dismiss());
  }

  goToHome() {
    this.router.navigate(['tabs/home']);
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }

  
}