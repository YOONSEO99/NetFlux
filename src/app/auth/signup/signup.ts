import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private authService = inject(AuthService);
  private router = inject(Router);

  signupData = {
    id: '',
    password: '',
    confirmPassword: '',
    username: ''
  };
  onSignup() {
    if (!this.signupData.id || !this.signupData.password
      || !this.signupData.confirmPassword || !this.signupData.username) {
      alert("Please input all!");
      return;
    } else if (this.signupData.password !== this.signupData.confirmPassword) {
      alert("Please check your password!");
      return;
    }

    const { confirmPassword, ...userData } = this.signupData;
    const success = this.authService.signUp(userData);
    if (success) {
      alert("Signup successful!")
      this.router.navigate(['/login']);
    }
  }

}
