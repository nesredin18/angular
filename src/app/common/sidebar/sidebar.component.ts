import { Component,EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private sidebarService: SidebarService) {}

  status = true;


  addToggle() {
    this.status = !this.status;
    this.sidebarService.toggleSidebar();
  }

}
