import { Component, OnInit } from '@angular/core';
import { DashboardBaseComponent } from '../dashboard-base/dashboard-base.component';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent extends DashboardBaseComponent implements OnInit {

  constructor() {
    super();
  }

  checkHomeDashBoard(): void{
    console.log('Execute HomeDashboardComponent');
  }
}
