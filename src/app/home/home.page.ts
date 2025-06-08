import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  // ✅ Simulated user data
  user = {
    name: 'Thamsanqa Ngubo',
    address: 'Umlazi, Durban',
    points: 280
  };

  // ✅ Simulated reports data
  totalReports: number = 12;
  pendingReports: number = 3;
  collectedReports: number = 9;

  constructor(private router: Router) {}

  // ✅ Navigation methods
  goToReportPage() {
    this.router.navigate(['/report']);
  }

  goToCentersPage() {
    this.router.navigate(['/recycling-centers']);
  }

  goToSupportPage() {
    this.router.navigate(['/support']);
  }
  
}
