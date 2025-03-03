import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

registerForm: FormGroup;

  constructor(private fb: FormBuilder,
     private userService: UserService,
     private toastController: ToastController
    ) {

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.showToast('User registered successfully!', 'success'); // ✅ Show success message
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.showToast(err.message, 'danger'); // ✅ Show error message
        }
      });
    }
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }


}
