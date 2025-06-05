import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  
  // User profile data
  userProfile = {
    name: 'Sipho Ndlovu',
    email: 'sihle.ngubo@example.com',
    phone: '+27 73 123 4567',
    address: '123 Mangosuthu Highway, Umlazi, Durban',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    points: 350,
    profilePicture: 'assets/profile/profile-picture.png'
  };

  // Notification count
  notificationCount = 3;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  // Load user profile data (could be from a service)
  loadUserProfile() {
    // This would typically fetch data from a service
    console.log('Loading user profile...');
  }

  // Edit profile functionality
  async editProfile() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Edit Profile',
      buttons: [
        {
          text: 'Change Profile Picture',
          icon: 'camera-outline',
          handler: () => {
            this.changeProfilePicture();
          }
        },
        {
          text: 'Edit Personal Info',
          icon: 'create-outline',
          handler: () => {
            this.editPersonalInfo();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  // Change profile picture
  async changeProfilePicture() {
    const toast = await this.toastController.create({
      message: 'Profile picture update feature coming soon!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  // Edit personal information
  async editPersonalInfo() {
    const alert = await this.alertController.create({
      header: 'Edit Name',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Enter your name',
          value: this.userProfile.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            if (data.name && data.name.trim()) {
              this.userProfile.name = data.name.trim();
              this.showSuccessToast('Name updated successfully!');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Complete profile action
  completeProfile() {
    this.router.navigate(['/complete-profile']);
  }

  // Open notifications
  openNotifications() {
    this.router.navigate(['/notifications']);
  }

  // Open app settings
  openSettings() {
    this.router.navigate(['/settings']);
  }

  // Open privacy & security
  openPrivacySecurity() {
    this.router.navigate(['/privacy-security']);
  }

  // Open help & support
  openHelpSupport() {
    this.router.navigate(['/help-support']);
  }

  // Logout functionality
  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.performLogout();
          }
        }
      ]
    });
    await alert.present();
  }

  // Perform logout
  async performLogout() {
    // Clear user data, tokens, etc.
    localStorage.clear();
    
    const toast = await this.toastController.create({
      message: 'Logged out successfully',
      duration: 2000,
      position: 'top'
    });
    toast.present();
    
    // Navigate to login page
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  // Show success toast
  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  // Navigation methods for bottom nav
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToRewards() {
    this.router.navigate(['/rewards']);
  }

  navigateToReport() {
    this.router.navigate(['/report']);
  }

  navigateToMyReports() {
    this.router.navigate(['/my-reports']);
  }
}