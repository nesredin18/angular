import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarStatus = new BehaviorSubject<boolean>(false);

  // Observable that components can subscribe to
  sidebarStatus$ = this.sidebarStatus.asObservable();

  // Method to toggle the status
  toggleSidebar() {
    this.sidebarStatus.next(!this.sidebarStatus.value);
  }
}
