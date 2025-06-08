import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recycling-centers',
  templateUrl: './recycling-centers.page.html',
  styleUrls: ['./recycling-centers.page.scss'],
  standalone: false,
})
export class RecyclingCentersPage implements OnInit {

  constructor() { }

recyclingCenters = [
  {
    name: 'Umlazi Eco Center',
    address: '123 Green St, Umlazi, Durban',
    hours: '8:00 AM - 5:00 PM',
    mapLink: 'https://maps.google.com/?q=Umlazi+Eco+Center'
  },
  {
    name: 'Durban Recycling Hub',
    address: '456 Ocean Ave, Durban',
    hours: '9:00 AM - 6:00 PM',
    mapLink: 'https://maps.google.com/?q=Durban+Recycling+Hub'
  }
];

  ngOnInit() {
  }

}
