import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController, ModalController } from '@ionic/angular';

interface Reward {
  id: string;
  category: string;
  title: string;
  description: string;
  points: number;
  image: string;
  status: 'active' | 'inactive';
  stock?: number;
  totalRedeemed: number;
  dateCreated: Date;
  expiryDate?: Date;
}

interface RedemptionRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  rewardId: string;
  rewardTitle: string;
  pointsUsed: number;
  redemptionDate: Date;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  notes?: string;
}

@Component({
  selector: 'app-manage-rewards',
  templateUrl: './manage-rewards.page.html',
  styleUrls: ['./manage-rewards.page.scss'],
  standalone: false,
})
export class ManageRewardsPage implements OnInit {

  segment = 'rewards';
  selectedCategory = 'all';
  
  categories = ['All', 'Grocery', 'Utilities', 'Telecom', 'Transport', 'Entertainment'];

  // Sample rewards data
  rewards: Reward[] = [
    {
      id: '1',
      category: 'GROCERY',
      title: 'R30 Shoprite Voucher',
      description: 'Redeem this voucher at any Shoprite store in South Africa',
      points: 350,
      image: 'assets/Rewards/Shoprite Voucher.png',
      status: 'active',
      stock: 50,
      totalRedeemed: 15,
      dateCreated: new Date('2024-01-15'),
      expiryDate: new Date('2025-12-31')
    },
    {
      id: '2',
      category: 'GROCERY',
      title: 'R50 Grocery Coupon',
      description: 'Valid at Pick n Pay, Checkers, and Spar stores nationwide',
      points: 250,
      image: 'assets/Rewards/Grocery Coupon.png',
      status: 'active',
      stock: 100,
      totalRedeemed: 32,
      dateCreated: new Date('2024-02-01')
    },
    {
      id: '3',
      category: 'UTILITIES',
      title: 'R100 Electricity Voucher',
      description: 'Top up your prepaid electricity meter with this voucher',
      points: 500,
      image: 'assets/Rewards/Elecricity voucher.png',
      status: 'inactive',
      stock: 25,
      totalRedeemed: 8,
      dateCreated: new Date('2024-01-20')
    }
  ];

  // Sample redemption records
  redemptions: RedemptionRecord[] = [
    {
      id: 'r1',
      userId: 'u1',
      userName: 'Sipho Ndlovu',
      userEmail: 'sipho@example.com',
      rewardId: '1',
      rewardTitle: 'R30 Shoprite Voucher',
      pointsUsed: 350,
      redemptionDate: new Date('2024-03-01'),
      status: 'pending'
    },
    {
      id: 'r2',
      userId: 'u2',
      userName: 'Thandi Mkhize',
      userEmail: 'thandi@example.com',
      rewardId: '2',
      rewardTitle: 'R50 Grocery Coupon',
      pointsUsed: 250,
      redemptionDate: new Date('2024-02-28'),
      status: 'completed'
    }
  ];

  // Statistics
  stats = {
    totalRewards: 0,
    activeRewards: 0,
    totalRedemptions: 0,
    pendingRedemptions: 0,
    totalPointsRedeemed: 0
  };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.calculateStats();
  }

  // Calculate dashboard statistics
  calculateStats() {
    this.stats.totalRewards = this.rewards.length;
    this.stats.activeRewards = this.rewards.filter(r => r.status === 'active').length;
    this.stats.totalRedemptions = this.redemptions.length;
    this.stats.pendingRedemptions = this.redemptions.filter(r => r.status === 'pending').length;
    this.stats.totalPointsRedeemed = this.redemptions.reduce((sum, r) => sum + r.pointsUsed, 0);
  }

  // Filter rewards by category
  get filteredRewards() {
    if (this.selectedCategory === 'all') {
      return this.rewards;
    }
    return this.rewards.filter(reward => 
      reward.category.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  // Filter redemptions by status
  get pendingRedemptions() {
    return this.redemptions.filter(r => r.status === 'pending');
  }

  get completedRedemptions() {
    return this.redemptions.filter(r => r.status === 'completed');
  }

  // Add new reward
  // Add new reward
async addReward() {
  const alert = await this.alertController.create({
    header: 'Add New Reward',
    inputs: [
      {
        name: 'title',
        type: 'text',
        placeholder: 'Reward Title'
      },
      {
        name: 'description',
        type: 'textarea',
        placeholder: 'Description'
      },
      {
        name: 'points',
        type: 'number',
        placeholder: 'Points Required'
      },
      {
        name: 'stock',
        type: 'number',
        placeholder: 'Stock Quantity'
      },
      {
        name: 'category',
        type: 'text',
        placeholder: 'Category (e.g., GROCERY, UTILITIES)',
        value: 'GENERAL'
      },
      {
        name: 'image',
        type: 'url',
        placeholder: 'Image URL or path (e.g., assets/Rewards/voucher.png)'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: (data) => {
          if (data.title && data.points && data.image) {
            this.createReward(data);
            return true;
          } else {
            this.showToast('Please fill in title, points, and image fields', 'warning');
            return false;
          }
        }
      }
    ]
  });
  await alert.present();
}

  // Create new reward
  createReward(data: any) {
    const newReward: Reward = {
      id: Date.now().toString(),
      category: data.category?.toUpperCase() || 'GENERAL',
      title: data.title,
      description: data.description || '',
      points: parseInt(data.points),
      image: data.image || 'assets/Rewards/default.png', // Use provided image
      status: 'active',
      stock: parseInt(data.stock) || 0,
      totalRedeemed: 0,
      dateCreated: new Date()
    };

    this.rewards.unshift(newReward);
    this.calculateStats();
    this.showToast('Reward added successfully!', 'success');
  }

  // Edit reward
  async editReward(reward: Reward) {
    const actionSheet = await this.actionSheetController.create({
      header: `Manage: ${reward.title}`,
      buttons: [
        {
          text: 'Edit Details',
          icon: 'create-outline',
          handler: () => {
            this.editRewardDetails(reward);
          }
        },
        {
          text: reward.status === 'active' ? 'Deactivate' : 'Activate',
          icon: reward.status === 'active' ? 'pause-outline' : 'play-outline',
          handler: () => {
            this.toggleRewardStatus(reward);
          }
        },
        {
          text: 'Update Stock',
          icon: 'layers-outline',
          handler: () => {
            this.updateStock(reward);
          }
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.deleteReward(reward);
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

  // Edit reward details
  async editRewardDetails(reward: Reward) {
    const alert = await this.alertController.create({
      header: 'Edit Reward',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Reward Title',
          value: reward.title
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Description',
          value: reward.description
        },
        {
          name: 'points',
          type: 'number',
          placeholder: 'Points Required',
          value: reward.points.toString()
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
            reward.title = data.title || reward.title;
            reward.description = data.description || reward.description;
            reward.points = parseInt(data.points) || reward.points;
            this.showToast('Reward updated successfully!', 'success');
          }
        }
      ]
    });
    await alert.present();
  }

  // Toggle reward status
  toggleRewardStatus(reward: Reward) {
    reward.status = reward.status === 'active' ? 'inactive' : 'active';
    this.calculateStats();
    this.showToast(`Reward ${reward.status === 'active' ? 'activated' : 'deactivated'}!`, 'success');
  }

  // Update stock
  async updateStock(reward: Reward) {
    const alert = await this.alertController.create({
      header: 'Update Stock',
      inputs: [
        {
          name: 'stock',
          type: 'number',
          placeholder: 'New Stock Quantity',
          value: reward.stock?.toString() || '0'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (data) => {
            reward.stock = parseInt(data.stock) || 0;
            this.showToast('Stock updated successfully!', 'success');
          }
        }
      ]
    });
    await alert.present();
  }

  // Delete reward
  async deleteReward(reward: Reward) {
    const alert = await this.alertController.create({
      header: 'Delete Reward',
      message: `Are you sure you want to delete "${reward.title}"? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            const index = this.rewards.findIndex(r => r.id === reward.id);
            if (index > -1) {
              this.rewards.splice(index, 1);
              this.calculateStats();
              this.showToast('Reward deleted successfully!', 'success');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Manage redemption
  async manageRedemption(redemption: RedemptionRecord) {
    const actionSheet = await this.actionSheetController.create({
      header: `Redemption: ${redemption.rewardTitle}`,
      subHeader: `User: ${redemption.userName}`,
      buttons: [
        {
          text: 'Approve',
          icon: 'checkmark-outline',
          handler: () => {
            this.updateRedemptionStatus(redemption, 'approved');
          }
        },
        {
          text: 'Complete',
          icon: 'checkmark-done-outline',
          handler: () => {
            this.updateRedemptionStatus(redemption, 'completed');
          }
        },
        {
          text: 'Cancel Redemption',
          icon: 'close-outline',
          role: 'destructive',
          handler: () => {
            this.updateRedemptionStatus(redemption, 'cancelled');
          }
        },
        {
          text: 'Add Notes',
          icon: 'document-text-outline',
          handler: () => {
            this.addRedemptionNotes(redemption);
          }
        },
        {
          text: 'Close',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  // Update redemption status
  updateRedemptionStatus(redemption: RedemptionRecord, status: RedemptionRecord['status']) {
    redemption.status = status;
    this.calculateStats();
    this.showToast(`Redemption ${status}!`, 'success');
  }

  // Add notes to redemption
  async addRedemptionNotes(redemption: RedemptionRecord) {
    const alert = await this.alertController.create({
      header: 'Add Notes',
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: 'Enter notes...',
          value: redemption.notes || ''
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
            redemption.notes = data.notes;
            this.showToast('Notes added successfully!', 'success');
          }
        }
      ]
    });
    await alert.present();
  }

  // Export data
  async exportData() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Export Data',
      buttons: [
        {
          text: 'Export Rewards',
          icon: 'download-outline',
          handler: () => {
            this.exportRewards();
          }
        },
        {
          text: 'Export Redemptions',
          icon: 'download-outline',
          handler: () => {
            this.exportRedemptions();
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

  // Export rewards data
  exportRewards() {
    const csvData = this.convertToCSV(this.rewards);
    this.downloadCSV(csvData, 'rewards.csv');
    this.showToast('Rewards exported successfully!', 'success');
  }

  // Export redemptions data
  exportRedemptions() {
    const csvData = this.convertToCSV(this.redemptions);
    this.downloadCSV(csvData, 'redemptions.csv');
    this.showToast('Redemptions exported successfully!', 'success');
  }

  // Convert data to CSV
  convertToCSV(data: any[]): string {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(value => 
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    ).join('\n');
    
    return `${headers}\n${rows}`;
  }

  // Download CSV file
  downloadCSV(csvData: string, filename: string) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Show toast message
  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }

  // Get status color
  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
      case 'completed':
      case 'approved':
        return 'success';
      case 'inactive':
      case 'cancelled':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'medium';
    }
  }
}