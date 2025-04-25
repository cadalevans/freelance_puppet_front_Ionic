import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';
import { UserHistory } from '../home/history';
import { CartResponse } from './cart.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
  standalone: false,

})
export class CardPage implements OnInit {

  lottieOptions: AnimationOptions = {
    path: 'https://assets5.lottiefiles.com/packages/lf20_G9WkKv.json', // Path to your Lottie animation JSON
    autoplay: true,
    loop: true
  };
  
  cartItems: any[] = [];
   histories: UserHistory[] = [];
  totalPrice: number = 0; // Store total price

  clientSecret!: string;
  loading = false;

  baseUrl = environment.apiUrl;

  constructor(private cardService: CardService, private userService: UserService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient,
    private router: Router
  ) {}

  userId = this.userService.getUserId(); // Replace with the actual user ID


  ngOnInit() {
    this.loadCartItems();
    this.cardService.refreshCart();
    this.cdRef.detectChanges();
  }

  

  ionViewWillEnter(): void {
    this.loadCartItems(); // ✅ Always fetch fresh data when switching to Cart
    this.cardService.refreshCart();
  }
  

  // Fetch cart details
loadCartItems(): void {
  this.cardService.getCardHistory(this.userId).subscribe(
    (data: CartResponse) => {
      if (data && data.histories) {
        // Map history to append the full image URL
        this.cartItems = data.histories.map(history => ({
          ...history,
          image: `${environment.apiUrl}${history.image}` // Full URL for images
        }));
        this.totalPrice = data.totalPrice;
        this.cdRef.detectChanges();
      } else {
        console.error('Unexpected response structure:', data);
      }
    },
    (error) => {
      console.error('Error fetching cart items:', error);
    }
  );
}


  // Remove item from cart
  removeFromCart(historyId: number): void {
    const removedItem = this.cartItems.find(item => item.id === historyId);
    
    if (removedItem) {
      this.totalPrice -= removedItem.price;
    }
  
    this.cardService.removeHistoryToCard(this.userId, historyId).subscribe(
      () => {
        this.cardService.notifyCartUpdate(); // 🔥 Notify all pages that cart changed
        this.loadCartItems();
        this.cardService.updateCartCount(this.cartItems.length - 1); // Update cart count
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error removing item:', error);
      }
    );
  }
  
  goToPayment() {
    this.router.navigate(['/stripe-payment', this.userId]);
  }

}
