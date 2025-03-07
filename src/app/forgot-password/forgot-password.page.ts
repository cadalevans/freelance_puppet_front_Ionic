import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage implements OnInit {

  email: string ='';

  loading = false;
  emailRequired= false;

  constructor(private router: Router,
    private userService: UserService,
    private toastController: ToastController,
    
    
  ) { }

  ngOnInit() {
        // get the email stored in userService
        this.email = this.userService.getEmail() || '';

        if(!this.email){
          this.emailRequired = true;
        }
  }

  resendPasswordVerifyEmail(){
    if (!this.email) {
      this.showToast('⚠️ Please enter your email before resending the code.', 'warning');
      return;
    }

    this.loading = true;

    this.userService.requestPasswordReset(this.email).subscribe({
      next: async () => {
        this.loading = false;

        // ✅ Store email in service
        this.userService.setEmail(this.email);
        
        this.router.navigate(['/change-password']);
        this.showToast('📩 Password reset code sent successfully.', 'success');
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
    });
    toast.present();
  }

}
