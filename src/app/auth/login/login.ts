import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginData = {
    id: '',
    password: ''
  }
  onLogin() {
    if (!this.loginData.id || !this.loginData.password) {
      alert("Please input all!");
      return;
    }
    const success = this.authService.login(this.loginData.id, this.loginData.password);
    if (success) {
      alert("Login successful!");
      this.router.navigate(['/dashboard']);
    }
  }

}
