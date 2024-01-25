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
loginservice: LoginService = inject(LoginService);

  private subscription: Subscription;
  status = true;

  constructor(private sidebarService: SidebarService,private router: Router) {
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

logout() {
  this.loginservice.logout();
  this.router.navigate(['/login']);
}


}
