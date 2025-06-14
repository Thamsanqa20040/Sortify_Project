import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface LearningCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  points: number;
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  points: number;
  categoryId: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  progress: number;
  current: number;
  required: number;
}

export interface DailyTip {
  id: string;
  content: string;
  points: number;
  read: boolean;
}

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
  standalone: false,
})
export class LearnPage implements OnInit {

  // User stats
  userPoints: number = 1250;
  userReports: number = 23;
  impactScore: number = 87;

  // Progress tracking
  completedLessons: number = 12;
  totalLessons: number = 24;
  overallProgress: number = 0;

  // Learning categories
  learningCategories: LearningCategory[] = [
    {
      id: 'waste-types',
      title: 'Waste Types & Sorting',
      description: 'Learn to identify and properly categorize different waste materials',
      icon: 'assets/icon/recycle.png',
      progress: 75,
      completedLessons: 6,
      totalLessons: 8,
      points: 150,
      completed: false
    },
    {
      id: 'recycling',
      title: 'Recycling Best Practices',
      description: 'Master the art of effective recycling and waste reduction',
      icon: 'assets/icon/leaf.png',
      progress: 100,
      completedLessons: 5,
      totalLessons: 5,
      points: 200,
      completed: true
    },
    {
      id: 'hazardous',
      title: 'Hazardous Waste Safety',
      description: 'Safely handle and report dangerous waste materials',
      icon: 'assets/icon/warning.png',
      progress: 40,
      completedLessons: 2,
      totalLessons: 5,
      points: 250,
      completed: false
    },
    {
      id: 'community',
      title: 'Community Impact',
      description: 'Understand how waste management affects your neighborhood',
      icon: 'assets/icon/community.png',
      progress: 20,
      completedLessons: 1,
      totalLessons: 6,
      points: 180,
      completed: false
    }
  ];

  // Featured lesson
  featuredLesson: Lesson = {
    id: 'plastic-identification',
    title: 'Identifying Plastic Types',
    description: 'Learn the 7 types of plastic and their recycling symbols',
    thumbnail: 'assets/images/plastic-types.jpg',
    duration: 8,
    points: 50,
    categoryId: 'waste-types'
  };

  // Daily tip
  dailyTip: DailyTip = {
    id: 'tip-001',
    content: 'Did you know? Cleaning containers before recycling increases their chance of being processed by 60%!',
    points: 5,
    read: false
  };

  // Recent achievements
  recentAchievements: Achievement[] = [
    {
      id: 'first-report',
      title: 'First Reporter',
      description: 'Submit your first waste report',
      icon: 'assets/icon/trophy-bronze.png',
      points: 50,
      unlocked: true,
      progress: 100,
      current: 1,
      required: 1
    },
    {
      id: 'plastic-expert',
      title: 'Plastic Expert',
      description: 'Report 10 plastic waste items',
      icon: 'assets/icon/trophy-silver.png',
      points: 100,
      unlocked: false,
      progress: 70,
      current: 7,
      required: 10
    },
    {
      id: 'community-hero',
      title: 'Community Hero',
      description: 'Make 25 waste reports',
      icon: 'assets/icon/trophy-gold.png',
      points: 200,
      unlocked: false,
      progress: 92,
      current: 23,
      required: 25
    },
    {
      id: 'learning-enthusiast',
      title: 'Learning Enthusiast',
      description: 'Complete 5 learning modules',
      icon: 'assets/icon/trophy-diamond.png',
      points: 150,
      unlocked: false,
      progress: 80,
      current: 4,
      required: 5
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculateOverallProgress();
    this.loadUserProgress();
  }

  calculateOverallProgress() {
    this.overallProgress = (this.completedLessons / this.totalLessons) * 100;
  }

  loadUserProgress() {
    // This would typically load from a service
    // For now, we'll simulate loading user data
    console.log('Loading user progress...');
  }

  openCategory(category: LearningCategory) {
    console.log('Opening category:', category.title);
    // Navigate to category detail page
    this.router.navigate(['/learn/category', category.id]);
  }

  startLesson(lesson: Lesson) {
    console.log('Starting lesson:', lesson.title);
    // Navigate to lesson page
    this.router.navigate(['/learn/lesson', lesson.id]);
  }

  markTipRead() {
    if (!this.dailyTip.read) {
      this.dailyTip.read = true;
      this.userPoints += this.dailyTip.points;
      console.log(`Gained ${this.dailyTip.points} points from daily tip!`);
      
      // Show success message
      this.showPointsEarned(this.dailyTip.points);
    }
  }

  private showPointsEarned(points: number) {
    // You can implement a toast or alert here
    alert(`Great! You earned ${points} points!`);
  }

  // Method to check if user has unlocked new achievements
  checkAchievements() {
    this.recentAchievements.forEach(achievement => {
      if (!achievement.unlocked && achievement.current >= achievement.required) {
        achievement.unlocked = true;
        this.userPoints += achievement.points;
        this.showAchievementUnlocked(achievement);
      }
    });
  }

  private showAchievementUnlocked(achievement: Achievement) {
    alert(`🎉 Achievement Unlocked: ${achievement.title}! +${achievement.points} points`);
  }

  // Method to update progress when user completes activities
  updateProgress(activityType: string) {
    switch (activityType) {
      case 'report_submitted':
        this.userReports++;
        this.impactScore += Math.floor(Math.random() * 5) + 1;
        break;
      case 'lesson_completed':
        this.completedLessons++;
        this.calculateOverallProgress();
        break;
    }
    this.checkAchievements();
  }
}