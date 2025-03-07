import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
  standalone: false
})
export class CardPage implements OnInit {

  cartItems: any[] = [];

  totalPrice: number = 0; // Store total price

  constructor(private cardService: CardService, private userService: UserService) {}

  userId = this.userService.getUserId(); // Replace with the actual user ID


  ngOnInit() {
    this.loadCartItems();
  }

  // Fetch cart details
  loadCartItems(): void {
    this.cardService.getCardHistory(this.userId).subscribe(
      (data: any) => {
        if (data && data.histories) {
          this.cartItems = data.histories; // Store histories
          this.totalPrice = data.totalPrice; // Store total price
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
    this.cardService.removeHistoryToCard(this.userId, historyId).subscribe(
      () => {
        this.cartItems = this.cartItems.filter(item => item.id !== historyId);
        this.totalPrice -= this.cartItems.find(item => item.id === historyId)?.price || 0;
      },
      (error) => {
        console.error('Error removing item:', error);
      }
    );
  }

}
