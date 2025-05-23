import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  email: string = '';
  password: string = '';

  // ✅ Add this property to toggle password visibility
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // ✅ Add this method to toggle password visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    const user = await this.authService.login(this.email, this.password);
    if (user) {
      alert('Login Successful!');
      this.router.navigate(['/home']);
    } else {
      alert('Login Failed!');
    }
  }
}
