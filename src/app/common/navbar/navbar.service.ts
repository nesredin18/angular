import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  private navbarStatus = new BehaviorSubject<boolean>(false);

  // Observable that components can subscribe to
  navbarStatus$ = this.navbarStatus.asObservable();

  // Method to toggle the status
  toggleSidebar() {
    this.navbarStatus.next(!this.navbarStatus.value);
  }
}
