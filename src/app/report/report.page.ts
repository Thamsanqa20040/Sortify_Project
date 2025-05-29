import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: false,
})
export class ReportPage implements OnInit {

  wasteTypes = [
    { type: 'Plastic', label: 'Plastic' },
    { type: 'Paper', label: 'Paper' },
    { type: 'Glass', label: 'Glass' },
    { type: 'Metal', label: 'Metal' },
    { type: 'E-Waste', label: 'E-Waste' },
    { type: 'Organic', label: 'Organic' },
    { type: 'Hazardous', label: 'Hazardous' },
    { type: 'Other', label: 'Other' }
  ];

  selectedType: string = '';
  description: string = '';
  isLoading: boolean = false;
  location: any = null;

  constructor() {}

  ngOnInit() {
    // You can add geolocation logic here if needed
    this.location = { lat: 0, lng: 0 }; // Dummy location to avoid disabling the button
  }

  selectWasteType(type: string) {
    this.selectedType = type;
  }

  uploadPhoto() {
    alert('Upload photo clicked');
  }

  takePhoto() {
    alert('Take photo clicked');
  }

  submitReport() {
    this.isLoading = true;
    setTimeout(() => {
      alert('Report submitted!');
      this.isLoading = false;
    }, 2000);
  }
}
