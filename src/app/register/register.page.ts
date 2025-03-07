import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {


 registerForm: FormGroup;
 
   constructor(private fb: FormBuilder,
      private userService: UserService,
      private toastController: ToastController,
      private router:Router
     ) {
 
     this.registerForm = this.fb.group({
       firstName: ['', Validators.required],
       lastName: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required],
     });
   }

   ngOnInit(): void {
    
   }
 
   registerUser() {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
  
          // Store email locally
          const email = this.registerForm.value.email;
          localStorage.setItem('userEmail', email);
  
          // Retrieve and store user ID
          this.userService.getUserIdByEmail(email).subscribe({
            next: (userId) => {
              this.userService.setUserId(userId);
              // Navigate to verification
              this.router.navigate(['/account-verify']);
              this.showToast('User registered successfully!', 'success'); // ✅ Show success message
            },
            error: (err) => {
              console.error('Error retrieving user ID:', err);
              this.showToast('Error retrieving user ID', 'danger'); // ✅ Show error message
            }
          });
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