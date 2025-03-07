import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { UserService } from '../user.service';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [IonicModule, ReactiveFormsModule], // ✅ Import IonicModule here
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup

  constructor(private formbuilder: FormBuilder,
     private toastController: ToastController,
      private userService: UserService,
      private router : Router
    ) { 
      this.loginForm = this.formbuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
  }

  uniqueId = Math.random().toString(36).substring(2, 15); // Generate a unique ID

  ngOnInit() {
  }

  loginUser() {
    if (this.loginForm.valid) {
  
            // ✅ Check if the user is verified
          this.userService.isVerified(this.loginForm.value.email).subscribe({
            next: (isVerified) => {
              if (isVerified) {
                // Redirect to Home if verified
                this.router.navigate(['/home']);
              } else {
                // Redirect to Verification page if not verified
                this.router.navigate(['/account-verify']);
                this.showToast('Please verify your account first.', 'danger');
              }
            }
          });
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('User logged in:', response);
  
          // ✅ Store email in service
          this.userService.setEmail(this.loginForm.value.email);
          
          // Retrieve and store user ID
          this.userService.getUserIdByEmail(this.loginForm.value.email).subscribe({
            next: (userId) => {
              this.userService.setUserId(userId);
              // Navigate to verification
              
              this.showToast(response.message, 'success'); // ✅ Show success message
            },
            error: (err) => {
              console.error('Error retrieving user ID:', err);
              //this.showToast('Error retrieving user ID', 'danger'); // ✅ Show error message
            }
          });
  

        },
        error: (err) => {
          console.error('Login error:', err);
          this.showToast(err.error.message, 'danger');
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
