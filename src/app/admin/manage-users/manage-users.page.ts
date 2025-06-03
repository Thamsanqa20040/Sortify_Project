import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  totalReports: number;
  totalPoints: number;
  lastActive: string;
  avatar?: string;
  role: 'user' | 'collector' | 'admin';
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
  standalone: false,
})
export class ManageUsersPage implements OnInit {
  users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+27 81 234 5678',
      location: 'V Section, Umlazi, Durban',
      joinDate: '2023-10-15',
      status: 'active',
      totalReports: 15,
      totalPoints: 750,
      lastActive: '2023-12-15',
      role: 'user'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+27 82 345 6789',
      location: 'W Section, Umlazi, Durban',
      joinDate: '2023-09-20',
      status: 'active',
      totalReports: 22,
      totalPoints: 1100,
      lastActive: '2023-12-14',
      role: 'user'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+27 83 456 7890',
      location: 'T Section, Umlazi, Durban',
      joinDate: '2023-11-01',
      status: 'inactive',
      totalReports: 8,
      totalPoints: 400,
      lastActive: '2023-12-01',
      role: 'user'
    },
    {
      id: '4',
      name: 'Collector A',
      email: 'collector.a@company.com',
      phone: '+27 84 567 8901',
      location: 'Durban Collection Center',
      joinDate: '2023-08-01',
      status: 'active',
      totalReports: 0,
      totalPoints: 0,
      lastActive: '2023-12-15',
      role: 'collector'
    }
  ];

  filteredUsers: User[] = [];
  totalUsers = 0;
  activeCount = 0;
  inactiveCount = 0;
  suspendedCount = 0;
  filterStatus: string = 'all';
  filterRole: string = 'all';
  searchTerm: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.filteredUsers = [...this.users];
    this.updateCounts();
  }

  addNewUser() {
    // Implement add new user functionality
    this.router.navigate(['/admin/add-user']);
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      const matchesStatus = this.filterStatus === 'all' || user.status === this.filterStatus;
      const matchesRole = this.filterRole === 'all' || user.role === this.filterRole;
      const matchesSearch = !this.searchTerm || 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesStatus && matchesRole && matchesSearch;
    });
  }

  updateCounts() {
    this.totalUsers = this.users.length;
    this.activeCount = this.users.filter(u => u.status === 'active').length;
    this.inactiveCount = this.users.filter(u => u.status === 'inactive').length;
    this.suspendedCount = this.users.filter(u => u.status === 'suspended').length;
  }

  getUserInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'medium';
      case 'suspended': return 'danger';
      default: return 'medium';
    }
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'admin': return 'danger';
      case 'collector': return 'warning';
      case 'user': return 'primary';
      default: return 'medium';
    }
  }

  async presentUserActions(user: User) {
    const actionSheet = await this.actionSheetController.create({
      header: `Actions for ${user.name}`,
      buttons: [
        {
          text: 'View Profile',
          icon: 'person-outline',
          handler: () => {
            this.viewUserProfile(user);
          }
        },
        {
          text: 'Edit User',
          icon: 'create-outline',
          handler: () => {
            this.editUser(user);
          }
        },
        {
          text: user.status === 'suspended' ? 'Unsuspend User' : 'Suspend User',
          icon: user.status === 'suspended' ? 'checkmark-circle-outline' : 'ban-outline',
          handler: () => {
            this.toggleUserSuspension(user);
          }
        },
        {
          text: 'Delete User',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.deleteUser(user);
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

  viewUserProfile(user: User) {
    this.router.navigate(['/admin/user-profile', user.id]);
  }

  editUser(user: User) {
    this.router.navigate(['/admin/edit-user', user.id]);
  }

  async toggleUserSuspension(user: User) {
    const action = user.status === 'suspended' ? 'unsuspend' : 'suspend';
    const alert = await this.alertController.create({
      header: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
      message: `Are you sure you want to ${action} ${user.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: action.charAt(0).toUpperCase() + action.slice(1),
          handler: () => {
            // Update user status
            user.status = user.status === 'suspended' ? 'active' : 'suspended';
            this.updateCounts();
            this.presentToast(`User ${action}ed successfully`);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteUser(user: User) {
    const alert = await this.alertController.create({
      header: 'Delete User',
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // Remove user from array
            this.users = this.users.filter(u => u.id !== user.id);
            this.filterUsers();
            this.updateCounts();
            this.presentToast('User deleted successfully');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}