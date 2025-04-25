import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActionSheetController, GestureController, ToastController } from '@ionic/angular';
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

  histories: UserHistory[] = [];
  public latestHistories: any[] = [];
  filteredHistories: any[] = []; // Displayed histories (filtered)
  userId = this.userService.getUserId(); // Replace with the actual user ID

  cartItems: Set<number> = new Set();
  selectedHistories: Set<number> = new Set();

  selectAllChecked = false; // Track if all are selected
  isMultiSelectMode = false; // Track multi-selection mode

  pressTimer: any

  @ViewChildren('historyItem') historyItems!: QueryList<ElementRef>;

  constructor(private fb: FormBuilder,
     private userService: UserService,
     private toastController: ToastController,
     private router:Router,
     private historyService: HistoryService,
     private cardService: CardService,
     private gestureCtrl: GestureController,
     private cdRef: ChangeDetectorRef,
     private actionSheetCtrl: ActionSheetController
    ) {


    }
  

    ngOnInit(): void {

      if(!this.userId || this.userId == null){
        this.router.navigate(['/login'])
      }
      this.fetchHistories();
      this.loadCartItems();
      this.cdRef.detectChanges();

       // Subscribe to cart updates
    this.cardService.cartUpdated$.subscribe(() => {
      // Trigger a reload of cart data when the cart is updated
      this.loadCartItems();
    });

    // trie ou récupère les derniers éléments
    this.latestHistories = this.histories.slice(0, 5);
    }
      
   // Fetch all histories
   fetchHistories(): void {
    this.historyService.getAllHistory(this.userId).subscribe(
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
  

  // Add item to cart
  addToCart(historyId: number, event: Event): void {
    event.stopImmediatePropagation();
    
    this.cardService.addHistoryToCard(this.userId, historyId).subscribe(
      () => {
        this.cartItems.add(historyId); // ✅ Update UI to hide cart icon
        this.realTimeLoader(); // ✅ Update cart count
  
        this.cardService.getCardHistory(this.userId).subscribe(() => {
          this.cardService.updateCartCount(this.cartItems.size); // ✅ Refresh data in Cart
        });
  
        this.cdRef.detectChanges();
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
      this.router.navigate(['/tabs/history-detail', historyId]);
    }
// count the history added or removed in realtime 
    realTimeLoader() {
      this.cardService.getCardHistory(this.userId).subscribe((cartData) => {
        const count = cartData?.histories?.length || 0;
        this.cardService.updateCartCount(count);
      });
    }


  // ✅ Add Multiple Items to Cart
  addSelectedToCart() {
    const selectedArray = Array.from(this.selectedHistories);
    if (selectedArray.length === 0) {
      console.warn("⚠ No histories selected. Aborting API call.");
      return;
    }
  
    this.cardService.addMultipleHistoriesToCard(this.userId, selectedArray).subscribe(() => {
      // ✅ Add items to cartItems Set (to track UI state)
      selectedArray.forEach(id => this.cartItems.add(id));

      console.log('cart Items value : ', this.cartItems)
  
      // ✅ Optionally, update locally before API response
      this.cardService.getCardHistory(this.userId).subscribe(() => {
        this.cardService.updateCartCount(this.cartItems.size); // ✅ Refresh data in Cart
      });
        
      // ✅ Update cart count correctly
      this.realTimeLoader(); // Updates from API
  
      // ✅ Clear selection & exit multi-select mode
      this.selectedHistories.clear();
      this.isMultiSelectMode = false;
      this.cdRef.detectChanges();
    });
  }
  




/** Toggle Selection */
toggleSelection(historyId: number) {
  
  console.log("🔄 Toggling selection for:", historyId);

  if (this.selectedHistories.has(historyId)) {
    console.log("❌ Removing from selection:", historyId);
    this.selectedHistories.delete(historyId);
  } else {
    console.log("✅ Adding to selection:", historyId);
    this.selectedHistories.add(historyId);
  }

  console.log("📌 Selected Histories Set:", Array.from(this.selectedHistories));

  // Exit multi-select mode if no items are selected
  this.isMultiSelectMode = this.selectedHistories.size > 0;
}


/** Select All Histories */
selectAll() {
  if (this.selectedHistories.size === this.histories.length) {
    console.log("🔴 Clearing selection");
    this.selectedHistories.clear();
    this.isMultiSelectMode = false; // Exit multi-select mode
  } else {
    this.selectedHistories = new Set(
      this.histories
        .filter(history => !this.cartItems.has(history.id)) // Only select those NOT in the cart
        .map(history => history.id)
    );
    this.isMultiSelectMode = true; // Enable multi-select mode
  }
  
  this.cdRef.detectChanges(); // Force UI refresh
}

/** Add Selected Items to Cart */
addToCarts() {
  const selectedArray = Array.from(this.selectedHistories);
  console.log("Selected Histories:", selectedArray); // ✅ Check if data is correct

  if (selectedArray.length === 0) {
    console.warn("⚠ No histories selected. Aborting API call.");
    return;
  }

  this.cardService.addMultipleHistoriesToCard(this.userId, selectedArray).subscribe(
    () => {
      console.log("✅ API Call Successful!");
      this.selectedHistories.clear();
      this.isMultiSelectMode = false;
    },
    (error) => {
      console.error("❌ Error adding multiple histories:", error);
    }
  );
}


  /** Show Action Sheet */
  async presentActionSheet(event: Event) {
    event.stopPropagation(); // Prevents any unintended click propagation
  
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Options',
      buttons: [
        {
          text: 'Select Many',
          handler: () => {
            this.isMultiSelectMode = true;
          }
        },
        {
          text: 'Select All',
          handler: () => {
            this.selectAll();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  
    await actionSheet.present();
  }

  /** Enable Multi-Selection */
  enableMultiSelect(historyId: number) {
    this.isMultiSelectMode = true;
    this.toggleSelection(historyId);
  }


  onSegmentChanged(value: string) {
    if (value === 'favorites') {
      this.router.navigate(['/tabs/by-category']);
    } else {
      this.router.navigate(['/tabs/home']);
    }
  }
  

}


