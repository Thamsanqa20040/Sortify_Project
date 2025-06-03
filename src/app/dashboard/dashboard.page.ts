// admin-dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface DashboardStats {
  totalReports: number;
  pendingReports: number;
  collectedReports: number;
  totalUsers: number;
  activeUsers: number;  
  totalPoints: number;
  todayReports: number;
  weeklyReports: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  stats: DashboardStats = {
    totalReports: 156,
    pendingReports: 23,
    collectedReports: 98,
    totalUsers: 89,
    activeUsers: 67,
    totalPoints: 12450,
    todayReports: 8,
    weeklyReports: 34
  };

  recentActivities = [
    {
      id: 1,
      type: 'report_submitted',
      message: 'New plastic waste report submitted by John Doe',
      time: '2 minutes ago',
      icon: 'document-outline',
      color: 'primary'
    },
    {
      id: 2,
      type: 'report_collected',
      message: 'Glass bottles collected by Collector A',
      time: '15 minutes ago',
      icon: 'checkmark-circle-outline',
      color: 'success'
    },
    {
      id: 3,
      type: 'user_registered',
      message: 'New user Jane Smith registered',
      time: '1 hour ago',
      icon: 'person-add-outline',
      color: 'secondary'
    },
    {
      id: 4,
      type: 'points_awarded',
      message: '50 points awarded to Mike Johnson',
      time: '2 hours ago',
      icon: 'trophy-outline',
      color: 'warning'
    },
    {
      id: 5,
      type: 'report_assigned',
      message: 'Paper waste report assigned to Collector B',
      time: '3 hours ago',
      icon: 'person-outline',
      color: 'tertiary'
    }
  ];

  quickActions = [
    {
      title: 'Manage Reports',
      subtitle: 'View and manage waste reports',
      icon: 'document-text-outline',
      route: '/admin/manage-reports',
      color: 'primary'
    },
    {
      title: 'Manage Users',
      subtitle: 'View and manage user accounts',
      icon: 'people-outline',
      route: '/admin/manage-users',
      color: 'secondary'
    },
    {
      title: 'Analytics',
      subtitle: 'View detailed analytics',
      icon: 'analytics-outline',
      route: '/admin/analytics',
      color: 'tertiary'
    },
    {
      title: 'Settings',
      subtitle: 'System settings and configuration',
      icon: 'settings-outline',
      route: '/admin/settings',
      color: 'medium'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    // Load dashboard data
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Simulate API call to load dashboard statistics
    // In real app, this would be a service call
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  refreshData() {
    // Simulate refresh
    this.loadDashboardData();
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'report_submitted': return 'document-outline';
      case 'report_collected': return 'checkmark-circle-outline';
      case 'user_registered': return 'person-add-outline';
      case 'points_awarded': return 'trophy-outline';
      case 'report_assigned': return 'person-outline';
      default: return 'information-circle-outline';
    }
  }

  getPercentageChange(current: number, previous: number): number {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  }
}

// admin-dashboard.page.html