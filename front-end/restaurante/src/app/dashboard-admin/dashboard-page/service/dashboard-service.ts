
import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {
  private isDashboardView = false;

  setDashboardView(isDashboard: boolean) {
    this.isDashboardView = isDashboard;
    console.log('Dashboard view set to', isDashboard);
  }
  
  isDashboard() {
    console.log('Is dashboard:', this.isDashboardView);
    return this.isDashboardView;
  }
}
