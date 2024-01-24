import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../sidebar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private subscription: Subscription;
  status = true;

  constructor(private sidebarService: SidebarService) {
    // Subscribe to the sidebar status
    this.subscription = this.sidebarService.sidebarStatus$.subscribe(
      (      status: boolean) => {
        this.status = status;
        this.editdashboard(); // Call editdashboard on status change
      }
    );
  }


editdashboard()
{
  this.status = !this.status;       
}

ngOnDestroy() {
  this.subscription.unsubscribe(); // Prevent memory leaks
}


}
