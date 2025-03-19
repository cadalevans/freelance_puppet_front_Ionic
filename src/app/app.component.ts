import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { CardService } from './card.service';
import { App, AppState } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    App.addListener('appStateChange', (state: AppState) => {
      if (state.isActive) {
        console.log('App is active again; Reloading page ...');
        setTimeout(() => {
          location.reload(); // ✅ Force page reload
        }, 500); // Small delay to allow app to settle
      }
    });
  }
}
