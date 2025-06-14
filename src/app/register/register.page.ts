import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Firebase imports
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  // Form fields
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  
  // UI state
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Toggle password visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Validate form inputs
  private validateForm(): string | null {
    // Check if all fields are filled
    if (!this.fullName.trim()) {
      return 'Please enter your full name';
    }
    
    if (!this.email.trim()) {
      return 'Please enter your email address';
    }
    
    if (!this.password) {
      return 'Please enter a password';
    }
    
    if (!this.confirmPassword) {
      return 'Please confirm your password';
    }
    
    if (!this.acceptTerms) {
      return 'Please accept the terms and conditions';
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return 'Please enter a valid email address';
    }

    // Validate password strength
    if (this.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      return 'Passwords do not match';
    }

    return null; // All validations passed
  }

  // Show alert message
  private async showAlert(message: string, isError: boolean = true) {
    // You can customize this to use ionic alerts or toast notifications
    if (isError) {
      console.error(message);
      alert(message); // Replace with proper ionic alert
    } else {
      console.log(message);
      alert(message); // Replace with proper ionic toast
    }
  }

  // Register user
  async register() {
    // Prevent multiple submissions
    if (this.isLoading) {
      return;
    }

    // Validate form
    const validationError = this.validateForm();
    if (validationError) {
      await this.showAlert(validationError);
      return;
    }

    this.isLoading = true;

    try {
      const auth = getAuth();
      const db = getFirestore();

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        this.email.trim(), 
        this.password
      );
      
      const uid = userCredential.user.uid;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'Users', uid), {
        fullName: this.fullName.trim(),
        email: this.email.trim(),
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        isActive: true
      });

      // Show success message
      await this.showAlert('Registration successful! Welcome aboard!', false);
      
      // Clear form
      this.clearForm();
      
      // Navigate to login page
      this.router.navigate(['/login']);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific Firebase errors
      let errorMessage = 'Registration failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please use a different email or try logging in.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password registration is not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection and try again.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      }
      
      await this.showAlert(errorMessage);
    } finally {
      this.isLoading = false;
    }
  }

  // Clear form data
  private clearForm() {
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.acceptTerms = false;
    this.showPassword = false;
    this.showConfirmPassword = false;
  }

  // Navigate to login page
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Handle social login (placeholder methods)
  async loginWithGoogle() {
    // Implement Google login
    console.log('Google login clicked');
    // You can implement this using Firebase Auth with Google provider
  }

  async loginWithFacebook() {
    // Implement Facebook login
    console.log('Facebook login clicked');
    // You can implement this using Firebase Auth with Facebook provider
  }
}