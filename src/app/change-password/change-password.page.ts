import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: false
})
export class ChangePasswordPage implements OnInit {

   email: string = '';
   code: string = '';
   password: string = '';
   loading = false;
 
   errorMessage = '';
 
   emailRequired = false;
 
   constructor(private toastController: ToastController  ,private router: Router, private userService: UserService, fb:FormBuilder) { }
 
   ngOnInit() {
 
     // get the email stored in userService
     this.email = this.userService.getEmail() || '';
 
     if(!this.email){
       this.emailRequired = true;
     }
   }
 
   async changePassword() {
     if (!this.email) {
       this.showToast('⚠️ Please enter your email before verifying.', 'warning');
       return;
     }

     if (!this.code) {
      this.showToast('⚠️ Please enter your code before verifying.', 'warning');
      return;
    }

    if (!this.password) {
      this.showToast('⚠️ Please enter your new passwor before verifying.', 'warning');
      return;
    }
 
     this.loading = true;
 
     this.userService.resetPassword(this.email, this.code, this.password).subscribe({
       next: async () => {
         this.loading = false;
         this.showToast('✅ Password changed successfully! You can now log in.', 'success');
         this.router.navigate(['/login'])
       },
       error: async (error) => {
         this.loading = false;
         let errorMessage = 'Something went wrong. Please try again.';
 
         if (error.status === 400) {
           errorMessage = 'Invalid code. Please check and try again.';
         } else if (error.status === 404) {
           errorMessage = 'User not found. Please sign up first.';
         } else if (error.error && error.error.message) {
           errorMessage = error.error.message;
         }
 
         this.showToast(`❌ ${errorMessage}`, 'danger');
       },
     });
   }
 
   async resendCode() {
     if (!this.email) {
       this.showToast('⚠️ Please enter your email before resending the code.', 'warning');
       return;
     }
 
     this.loading = true;
 
     this.userService.resendPasswordResetEmail(this.email).subscribe({
       next: async () => {
         this.loading = false;
         this.showToast('📩 Verification code resent successfully.', 'success');
       },
       error: async (error) => {
         this.loading = false;
         let errorMessage = 'Something went wrong. Please try again.';
 
         if (error.status === 400) {
           errorMessage = 'Invalid email. Please check and try again.';
         } else if (error.status === 404) {
           errorMessage = 'User not found. Please sign up first.';
         } else if (error.error && error.error.message) {
           errorMessage = error.error.message;
         }
 
         this.showToast(`❌ ${errorMessage}`, 'danger');
       },
     });
   }
 
   async showToast(message: string, color: string) {
     const toast = await this.toastController.create({
       message: message,
       duration: 3000,
       position: 'top',
       color: color,
       mode: 'ios'
     });
     toast.present();
   }
}
