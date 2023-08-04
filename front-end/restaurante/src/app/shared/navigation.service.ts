// shared/navigation.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private showFooter = true;
  private showNav = true;

  constructor() { }

  shouldShowFooter(): boolean {
    return this.showFooter;
  }

  shouldShowNav(): boolean {
    return this.showNav;
  }

  hideNavigation() {
    this.showFooter = false;
    this.showNav = false;
  }

  showNavigation() {
    this.showFooter = true;
    this.showNav = true;
  }
}
