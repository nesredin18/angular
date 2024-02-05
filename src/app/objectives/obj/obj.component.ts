import { Component, inject, } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { Taskin, objective } from '../taskin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import{HttpClientModule} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../common/sidebar.service';

@Component({
  selector: 'app-obj',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,RouterLink],
  templateUrl: './obj.component.html',
  styleUrl: './obj.component.css'
})
export class ObjComponent {
  private subscription: Subscription;
  status = true;

  editdashboard()
  {
    this.status = !this.status;       
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe(); // Prevent memory leaks
  }


  housingService: TaskserviceService = inject(TaskserviceService)
  housingLocationList: Taskin[] = [];
  constructor(private router: Router,private sidebarService:SidebarService) {
    this.housingService.getAllHousingLocations().then((response: Taskin[]) => {
      this.housingLocationList = response;

    });
    this.subscription = this.sidebarService.sidebarStatus$.subscribe(
      (      status: boolean) => {
        this.status = status;
        this.editdashboard(); // Call editdashboard on status change
      }
    );
  }

  redirectToPage(location:any) {
    // Replace with your logic to determine the route based on the clicked location
    // For example, navigating to a detail page with an ID
    this.router.navigate(['/home/objdetail', location]);
  }

}
