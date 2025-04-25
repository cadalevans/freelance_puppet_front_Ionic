import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../history.service';
import { UserHistory } from '../home/history';
import { environment } from 'src/environments/environment';
import { CardService } from '../card.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
  standalone: false
})
export class HistoryDetailPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private cardService: CardService,
    private cdRef: ChangeDetectorRef,
    private userService: UserService,
    private toastController: ToastController
  ) {}

  history: any;
  userId = this.userService.getUserId();
  cartItems: Set<number> = new Set();

  ngOnInit() {
    const historyId = this.route.snapshot.paramMap.get('id');
  
    if (historyId) {
      const id = +historyId;
  
      // Fetch both: the history details + the cart
      this.getHistoryById(id);
      this.cardService.getCardHistory(this.userId).subscribe(cartData => {
        const ids = cartData?.histories?.map(h => h.id) || [];
        this.cartItems = new Set(ids);
  
        // Optional: detect changes
        this.cdRef.detectChanges();
      });
    }
  
    // Still listen to cart updates
    this.cardService.cartUpdated$.subscribe(() => {
      this.realTimeLoader();
    });
  }
  

  getHistoryById(id: number) {
    this.historyService.getHistoryById(id).subscribe(
      (data) => {
        this.history = {
          ...data,
          image: `${environment.apiUrl}${data.image}`,
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCategoryNames(): string {
    return this.history?.categoryName.map((category: { name: any }) => category.name).join(', ') || '';
  }

  getCategoryColor(category: string): string {
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360; // Keep it within HSL hue range
    return `hsl(${hue}, 70%, 80%)`; // Light pastel style
  }

  getRandomColor(): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF3', '#FFC300'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  addToCart(historyId: number, event: Event): void {
    event.stopImmediatePropagation();

    this.cardService.addHistoryToCard(this.userId, historyId).subscribe(
      () => {
        this.cartItems.add(historyId);
        this.realTimeLoader();

        this.cardService.getCardHistory(this.userId).subscribe(() => {
          this.cardService.refreshCart(); // pulls fresh data and updates count
          this.cardService.notifyCartUpdate(); // emits signal to listeners
        });

        this.cdRef.detectChanges();
        this.showToast('Added to cart!', 'success');
      },
      (error) => {
        console.error('Error adding to cart:', error);
        this.showToast('Failed to add to cart.', 'danger');
      }
    );
  }

  realTimeLoader() {
    this.cardService.getCardHistory(this.userId).subscribe((cartData) => {
      const count = cartData?.histories?.length || 0;
      this.cardService.updateCartCount(count);
    });
  }

  removeFromCart(historyId: number) {
    this.cardService.removeHistoryToCard(this.userId, historyId).subscribe(() => {
      this.realTimeLoader();
      this.cardService.refreshCart(); // pulls fresh data and updates count
      this.cardService.notifyCartUpdate(); // emits signal to listeners
      this.cdRef.detectChanges();
      this.cartItems.delete(historyId); // after remove
      this.showToast('Removed from cart.', 'success');
    });
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'middle'
    });
    await toast.present();
  }

}
