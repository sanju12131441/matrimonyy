import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  constructor() { }
  @Input() headerPosition;
  scroll(anchor: string) {
    const element = document.querySelector("#" + anchor);
    element.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  ngAfterViewInit() {
  }
}
