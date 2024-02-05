import { Component,EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private subscription: Subscription;
  constructor(private sidebarService: SidebarService) {

    this.subscription = this.sidebarService.sidebarStatus$.subscribe(
      (      status: boolean) => {
        this.status = status;
        this.addt() // Call editdashboard on status change
      }
    );
  }
  
  status = true;


  addToggle() {
    this.status = !this.status;
    this.sidebarService.toggleSidebar();
  }
  addt(){
    this.status=!this.status;
  }

}
