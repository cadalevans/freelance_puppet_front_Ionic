import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  cartCount: number = 0

  userId= this.userService.getUserId();

  constructor(private cardService: CardService, private userService: UserService) { }

  ngOnInit() {
    this.updateCartCount();
    this.cardService.getCartCount().subscribe((count) => {
      this.cartCount = count;
    });
  }

  updateCartCount() {
    this.cardService.getCardHistory(this.userId).subscribe(
      (cartData) => {
        this.cartCount = cartData?.histories?.length || 0; // Get cart item count
      },
      (error) => {
        console.error('Error fetching cart count:', error);
      }
    );
  }

}
