import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// Firebase imports
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  // Property to toggle password visibility
  showPassword: boolean = false;

  // Property to handle loading state for UI
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Method to toggle password visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Login function with proper Firebase authentication
  async login() {
    // Basic validation
    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    // Set loading state for better UX
    this.isLoading = true;
    
    try {
      const auth = getAuth();
      const db = getFirestore();

      // Authenticate user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      const uid = userCredential.user.uid;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'Users', uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User logged in:', userData);
        
        alert('Login Successful!');
        this.router.navigate(['/home']);
      } else {
        alert('User data not found. Please register first.');
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        alert('No account found with this email. Please register first.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Please enter a valid email address.');
      } else if (error.code === 'auth/invalid-credential') {
        alert('Invalid email or password. Please check your credentials.');
      } else {
        alert('Login failed. Please try again.');
      }
    } finally {
      // Reset loading state
      this.isLoading = false;
    }
  }
}
