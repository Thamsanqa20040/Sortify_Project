import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
  standalone: false,
})
export class RewardsPage implements OnInit {

  segment = 'available';
  categories = ['Grocery', 'Utilities', 'Telecom', 'Transport'];

  availableRewards = [
    {
      category: 'GROCERY',
      title: 'R30 Shoprite Voucher',
      description: 'Redeem this voucher at any Shoprite store in South Africa',
      points: 350,
      image: 'assets/Rewards/Shoprite Voucher.png',
    },
    {
      category: 'GROCERY',
      title: 'R50 Grocery Coupon',
      description: 'Valid at Pick n Pay, Checkers, and Spar stores nationwide',
      points: 250,
      image: 'assets/Rewards/Grocery Coupon.png',
    },
    {
      category: 'UTILITIES',
      title: 'R100 Electricity Voucher',
      description: 'Top up your prepaid electricity meter with this voucher',
      points: 500,
      image: 'assets/Rewards/Elecricity voucher.png',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
