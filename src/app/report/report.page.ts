import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: false  // ❌ REMOVE this line
})
export class ReportPage implements OnInit {

  wasteTypes: string[] = ['Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste', 'Organic', 'Hazardous', 'Other'];
  selectedType: string = '';
  description: string = '';

  constructor() { }

  ngOnInit() {
  }

  selectType(type: string) {
    this.selectedType = type;
  }

  uploadPhoto() {
    alert('Upload photo clicked');
  }

  takePhoto() {
    alert('Take photo clicked');
  }
}
