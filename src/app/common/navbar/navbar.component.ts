import { CommonModule } from '@angular/common';
import { Component, OnDestroy ,inject} from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from '../sidebar.service';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../users/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  dropdowns: { [key: string]: boolean } = {};

  toggleDropdown(dropdownId: string, event: Event) {
    if (this.status){
      this.editdashboard();
      this.sidebarService.toggleSidebar();
    }
    event.stopPropagation(); // Prevent the click from closing the dropdown immediately
    this.dropdowns[dropdownId] = !this.dropdowns[dropdownId];

  }

loginservice: LoginService = inject(LoginService);

  private subscription: Subscription;
  status = true;

  constructor(private sidebarService: SidebarService,private router: Router) {
    // Subscribe to the sidebar status
    this.subscription = this.sidebarService.sidebarStatus$.subscribe(
      (      status: boolean) => {
        this.status = status;
        this.editdashboard();
   // Call editdashboard on status change
      }
    );
  }

  ngOnInit(): void {
    // Close all dropdowns if clicked outside
    document.addEventListener('click', () => {
      Object.keys(this.dropdowns).forEach(key => {
        this.dropdowns[key] = false;
      });
    });
  }


editdashboard()
{
  this.status = !this.status;       
}

ngOnDestroy() {
  this.subscription.unsubscribe(); // Prevent memory leaks
}

logout() {
  this.loginservice.logout();
  this.router.navigate(['/login']);
}


}
