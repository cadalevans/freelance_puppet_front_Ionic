import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HistoryService } from '../history.service';
import { UserHistory } from './history';
import { environment } from 'src/environments/environment';
import { CardService } from '../card.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})


export class HomePage implements OnInit{



buyHistory(_t7: UserHistory) {
throw new Error('Method not implemented.');
}



public baseUrl: string = 'http://localhost:8082/';



  constructor(private fb: FormBuilder,
     private userService: UserService,
     private toastController: ToastController,
     private router:Router,
     private historyService: HistoryService,
     private cardService: CardService
    ) {


    }
  
    histories: UserHistory[] = [];
    filteredHistories: any[] = []; // Displayed histories (filtered)
    userId = this.userService.getUserId(); // Replace with the actual user ID
  
    cartItems: Set<number> = new Set();
  
    ngOnInit(): void {
      this.fetchHistories();
      this.loadCartItems();;
    }

    toggleFavorite(history:any) {
      history.isFavorited = !history.isFavorited;
    }
    
      
   // Fetch all histories
   fetchHistories(): void {
    this.historyService.getAllHistory(this.userId).subscribe(
      (data) => {
        this.histories = data.map(history => ({
          ...history,
          image: `${environment.apiUrl}${history.image}` // Ensure full URL for images
        }));
        this.filteredHistories = this.histories; // Initialize filtered list
      },
      (error) => console.error('Error fetching histories:', error)
    );
  }

  // Define an interface for cart item structure


  // Fetch items already in the cart
  loadCartItems(): void {
    this.cardService.getCardHistory(this.userId).subscribe(
      (cartData) => {
        if (cartData && cartData.histories) {
          this.cartItems = new Set(cartData.histories.map(item => item.id)); // Store as a Set for quick lookup
        }
      },
      (error) => console.error('Error fetching cart items:', error)
    );
  }

  // Add item to cart
  addToCart(historyId: number): void {
    this.cardService.addHistoryToCard(this.userId, historyId).subscribe(
      () => {
        this.cartItems.add(historyId); // Update UI to hide the cart icon
        this.realTimeLoader();
      },
      (error) => console.error('Error adding to cart:', error)
    );
  }

  // Search filter
  filterItems(event: any) {
    const val = event.target.value?.toLowerCase() || '';
    this.filteredHistories = val
      ? this.histories.filter(history => history.name.toLowerCase().includes(val))
      : this.histories;
  }


    // go to history detail page 

    goToHistoryDetail(historyId: number) {
      this.router.navigate(['/history-detail', historyId]);
    }
// count the history added or removed in realtime 
    realTimeLoader() {
      this.cardService.getCardHistory(this.userId).subscribe((cartData) => {
        const count = cartData?.histories?.length || 0;
        this.cardService.updateCartCount(count);
      });
    }


}
