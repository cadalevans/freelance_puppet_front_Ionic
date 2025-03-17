import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CardService } from '../card.service';
import { HistoryService } from '../history.service';
import { UserHistory } from '../home/history';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mystory',
  templateUrl: './mystory.page.html',
  styleUrls: ['./mystory.page.scss'],
  standalone: false
})
export class MystoryPage implements OnInit {

  constructor(private fb: FormBuilder,
     private userService: UserService,
     private toastController: ToastController,
     private router:Router,
     private historyService: HistoryService,
     private cardService: CardService,
     private cdRef: ChangeDetectorRef
    ) {


    }
  
    histories: UserHistory[] = [];
    filteredHistories: any[] = []; // Displayed histories (filtered)
    userId = this.userService.getUserId(); // Replace with the actual user ID
  
    cartItems: Set<number> = new Set();
  
    ngOnInit(): void {
      this.fetchHistories();
      //this.loadCartItems();;
    }

    toggleFavorite(history:any) {
      history.isFavorited = !history.isFavorited;
    }
    
      
   // Fetch all histories
   fetchHistories(): void {
    this.userService.getAllUserHistory(this.userId).subscribe(
      (data) => {
        console.log('Fetched Histories:', data); // Debugging API response
        this.histories = data.map(history => ({
          ...history,
          image: `${environment.apiUrl}${history.image}` // Ensure full URL for images
        }));
        this.filteredHistories = this.histories; // Initialize filtered list
        this.cdRef.detectChanges(); // ✅ Force UI update
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
