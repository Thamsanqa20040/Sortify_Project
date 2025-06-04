import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface Reward {
  id: string;
  category: string;
  title: string;
  description: string;
  points: number;
  image: string;
  stock: number;
  isActive: boolean;
  createdDate: Date;
}

interface RedemptionRecord {
  id: string;
  reward: Reward;
  userId: string;
  redeemedDate: Date;
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'EXPIRED';
  voucherCode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  private rewards: Reward[] = [
    {
      id: '1',
      category: 'GROCERY',
      title: 'R30 Shoprite Voucher',
      description: 'Redeem this voucher at any Shoprite store in South Africa',
      points: 350,
      image: 'assets/Rewards/Shoprite Voucher.png',
      stock: 50,
      isActive: true,
      createdDate: new Date()
    },
    {
      id: '2',
      category: 'GROCERY',
      title: 'R50 Grocery Coupon',
      description: 'Valid at Pick n Pay, Checkers, and Spar stores nationwide',
      points: 250,
      image: 'assets/Rewards/Grocery Coupon.png',
      stock: 25,
      isActive: true,
      createdDate: new Date()
    },
    {
      id: '3',
      category: 'UTILITIES',
      title: 'R100 Electricity Voucher',
      description: 'Top up your prepaid electricity meter with this voucher',
      points: 500,
      image: 'assets/Rewards/Elecricity voucher.png',
      stock: 10,
      isActive: true,
      createdDate: new Date()
    }
  ];

  private redemptions: RedemptionRecord[] = [];
  private rewardsSubject = new BehaviorSubject<Reward[]>(this.rewards);
  private pointsSubject = new BehaviorSubject<number>(350); // Default user points

  constructor() {}

  getActiveRewards(): Promise<Reward[]> {
    return Promise.resolve(this.rewards.filter(r => r.isActive && r.stock > 0));
  }

  getUserRedemptions(userId: string): Promise<RedemptionRecord[]> {
    return Promise.resolve(this.redemptions.filter(r => r.userId === userId));
  }

  redeemReward(rewardId: string, userId: string): Promise<RedemptionRecord> {
    const reward = this.rewards.find(r => r.id === rewardId);
    if (!reward || reward.stock <= 0) throw new Error('Reward not available');

    reward.stock -= 1;
    const redemption: RedemptionRecord = {
      id: 'red' + Date.now(),
      reward,
      userId,
      redeemedDate: new Date(),
      status: 'PENDING',
      voucherCode: this.generateVoucherCode()
    };

    this.redemptions.unshift(redemption);
    const currentPoints = this.pointsSubject.value;
    this.pointsSubject.next(currentPoints - reward.points);
    this.rewardsSubject.next(this.rewards);

    return Promise.resolve(redemption);
  }

  getRewardsUpdates(): Observable<Reward[]> {
    return this.rewardsSubject.asObservable();
  }

  getUserPointsUpdates(): Observable<number> {
    return this.pointsSubject.asObservable();
  }

  private generateVoucherCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
