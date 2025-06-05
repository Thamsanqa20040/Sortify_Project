import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-sites',
  templateUrl: './manage-sites.page.html',
  styleUrls: ['./manage-sites.page.scss'],
  standalone: false,
})
export class ManageSitesPage implements OnInit {

  // New business input model
  newBusiness = {
    name: '',
    location: ''
  };

  // Existing businesses list (temporary/in-memory)
  businesses: { name: string, location: string }[] = [
    { name: 'GreenCycle', location: 'Durban CBD' },
    { name: 'EcoDrop', location: 'Umlazi' }
  ];

  constructor() {}

  ngOnInit() {}

  // Add a new business
  addBusiness() {
    if (this.newBusiness.name.trim() && this.newBusiness.location.trim()) {
      this.businesses.push({ ...this.newBusiness });
      this.newBusiness = { name: '', location: '' };
    } else {
      alert('Please enter both name and location.');
    }
  }

  // Remove an existing business
  removeBusiness(index: number) {
    this.businesses.splice(index, 1);
  }
}
