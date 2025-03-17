import { Component, OnInit } from '@angular/core';
import { PaypalService } from '../paypal.service';
import { Browser } from '@capacitor/browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.page.html',
  styleUrls: ['./paypal-payment.page.scss'],
  standalone: false
})
export class PaypalPaymentPage implements OnInit {

  constructor(private paypalService: PaypalService, 
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  userId = this.userService.getUserId();

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['paymentId'] && params['PayerID'] && params['token'] && params['userId']) {
        const userId = parseInt(params['userId'], 10);  // Extract userId from URL
  
        this.paypalService.executePayment(params['paymentId'], params['PayerID'], params['token'], userId)
          .subscribe(response => {
            alert('Payment successful!');
          }, error => {
            alert('Payment failed: ' + JSON.stringify(error));
          });
      }
    });
  }
  

 async payWithPaypal(userId: number) {
    this.paypalService.createPayment(userId).subscribe(async (response: any) => {
      if(response.approvalUrl) {
        // Open the approval Url inside Webview
        //window.open(response.approvalUrl, '_system');// This opens PayPal in the in-app browser

        await Browser.open({url: response.approvalUrl}); // Open PayPal inside the app
      }
    })
  }



}
