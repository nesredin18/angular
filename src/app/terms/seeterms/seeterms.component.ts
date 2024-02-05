import { Component, inject } from '@angular/core';
import { TermService } from '../term.service';
import { Service } from '../service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../common/sidebar.service';

@Component({
  selector: 'app-seeterms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seeterms.component.html',
  styleUrl: './seeterms.component.css'
})
export class SeetermsComponent {
  private subscription: Subscription;
  status = true;

  housingService: TermService = inject(TermService)
  housingLocationList: Service[] = [];
  filteredLocationList: Service[] = [];
  constructor(private router: Router,sidebarService: SidebarService) {
    this.housingService.getAllterms().then((housingLocationList: Service[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
    this.subscription = sidebarService.sidebarStatus$.subscribe(
      (      status: boolean) => {
        this.status = status;
        this.editdashboard(); // Call editdashboard on status change
      }
    );
  }

  redirectToPage(location:any) {
    // Replace with your logic to determine the route based on the clicked location
    // For example, navigating to a detail page with an ID
    this.router.navigate(['/home/editterm', location]);
  }
  editdashboard()
{
  this.status = !this.status;       
}

ngOnDestroy() {
  this.subscription.unsubscribe(); // Prevent memory leaks
}
}
