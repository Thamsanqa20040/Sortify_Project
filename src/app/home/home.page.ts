import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  // Enhanced user data
  user = {
    name: 'Thamsanqa Ngubo',
    address: 'Umlazi, Durban, South Africa',
    points: 750,
    level: 'Eco Warrior',
    streak: 12,
    totalReports: 28,
    weeklyGoal: 15,
    weeklyProgress: 8
  };

  // Today's eco tip
  todaysTip = {
    title: "Today's Eco Tip",
    message: "Rinse containers before recycling to prevent contamination"
  };

  // Popular waste categories
  popularItems = [
    {
      id: 1,
      name: 'Plastic Bottle',
      category: 'Recyclable',
      color: '#E3F2FD',
      icon: 'bottle-outline',
      points: 15
    },
    {
      id: 2,
      name: 'Food Scraps',
      category: 'Compost',
      color: '#E8F5E8',
      icon: 'leaf-outline',
      points: 10
    },
    {
      id: 3,
      name: 'Batteries',
      category: 'Special',
      color: '#FFF3E0',
      icon: 'battery-half-outline',
      points: 25
    },
    {
      id: 4,
      name: 'Paper',
      category: 'Recyclable',
      color: '#E3F2FD',
      icon: 'document-outline',
      points: 8
    },
    {
      id: 5,
      name: 'Glass Jar',
      category: 'Recyclable',
      color: '#E3F2FD',
      icon: 'wine-outline',
      points: 12
    },
    {
      id: 6,
      name: 'Styrofoam',
      category: 'Landfill',
      color: '#FFEBEE',
      icon: 'cube-outline',
      points: 5
    }
  ];

  // Quick action tabs
  actionTabs = [
    { name: 'Sort', active: true, icon: 'funnel-outline' },
    { name: 'Locate', active: false, icon: 'location-outline' },
    { name: 'Schedule', active: false, icon: 'calendar-outline' },
    { name: 'Learn', active: false, icon: 'book-outline' }
  ];

  // Recent activity
  recentReports = [
    {
      id: 1,
      type: 'Plastic',
      title: 'Plastic bottles reported',
      location: 'V Section, Umlazi',
      date: 'Today',
      points: 45,
      status: 'Collected',
      color: '#4CAF50'
    },
    {
      id: 2,
      type: 'Paper',
      title: 'Cardboard boxes',
      location: 'W Section, Umlazi',
      date: 'Yesterday',
      points: 30,
      status: 'Pending',
      color: '#FF9800'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.animateOnLoad();
  }

  // Navigation methods
  goToReportPage() {
    this.router.navigate(['/report']);
  }

  goToCentersPage() {
    this.router.navigate(['/recycling-centers']);
  }

  goToRewardsPage() {
    this.router.navigate(['/rewards']);
  }

  goToProfilePage() {
    this.router.navigate(['/profile']);
  }

  goToSchedulePage() {
    this.router.navigate(['/schedule']);
  }

  goToLearnPage() {
    this.router.navigate(['/learn']);
  }

  // View item details
  viewItemDetails(item: any) {
    console.log('Viewing item:', item);
    // Navigate to item details or show modal
  }

  // Switch action tab
  switchTab(tabName: string) {
    this.actionTabs.forEach(tab => {
      tab.active = tab.name === tabName;
    });
    
    switch(tabName) {
      case 'Locate':
        this.goToCentersPage();
        break;
      case 'Schedule':
        this.goToSchedulePage();
        break;
      case 'Learn':
        this.goToLearnPage();
        break;
      default:
        // Stay on sort view
        break;
    }
  }

  // Get greeting based on time
  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  // Get progress percentage
  getProgressPercentage(): number {
    return Math.min((this.user.weeklyProgress / this.user.weeklyGoal) * 100, 100);
  }

  // Format points
  getFormattedPoints(): string {
    return this.user.points.toLocaleString();
  }

  // Animation helper
  private animateOnLoad() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in, .slide-up');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate');
        }, index * 100);
      });
    }, 100);
  }

  // Search functionality
  onSearchInput(event: any) {
    const query = event.target.value;
    console.log('Searching for:', query);
    // Implement search logic here
  }
}