import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: false  // ❌ REMOVE this line
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
