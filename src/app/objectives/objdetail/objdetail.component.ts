import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskserviceService } from '../taskservice.service';
import { Taskin } from '../taskin';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../activities/activity.service';
import { SharedService } from '../../sharedservice';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../common/sidebar.service';

@Component({
  selector: 'app-objdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './objdetail.component.html',
  styleUrl: './objdetail.component.css'
})
export class ObjdetailComponent {
  private subscription: Subscription;
  status = true;

  editdashboard()
  {
    this.status = !this.status;       
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe(); // Prevent memory leaks
  }

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(TaskserviceService);
  housingLocation: Taskin | undefined;
  housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
  housingLocationList: Taskin[] = [];
  taskservice: ActivityService = inject(ActivityService);

  constructor( private router: Router, private sharedService: SharedService,private sidebarService:SidebarService) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
    this.housingService.getHousingLocationByObjId(housingLocationId).then((housingLocationList: Taskin[]) => {
      this.housingLocationList = housingLocationList;
    });
    this.someMethod();
    this.subscription = this.sidebarService.sidebarStatus$.subscribe(
      (      status: boolean) => {
        this.status = status;
        this.editdashboard(); // Call editdashboard on status change
      }
    );
  }

  someMethod() {
    this.sharedService.updateData(this.housingLocationId); // Replace 'data' with the actual data
  }

  deleteTask() {
    // Confirm before deleting
    const userConfirmed = confirm('Are you sure you want to delete this task?');
  
    if (userConfirmed) {
      this.housingService.deleteTask(this.housingLocationId).subscribe(
        response => {
          alert('Task successfully deleted.');
          // Additional actions if needed
          this.router.navigate(['/home/obj']);
        },
        error => {
          alert('Error during deletion: ' + error.message);
        }
      );
    } else {
      // User clicked 'Cancel', do nothing
      alert('Deletion cancelled.');
    }
  }

  redirectToPage(location:any) {
    // Replace with your logic to determine the route based on the clicked location
    // For example, navigating to a detail page with an ID
    this.router.navigate(['/home/edittask', location]);
  }

  redirectToeditactivityPage(location:any) {
    // Replace with your logic to determine the route based on the clicked location
    // For example, navigating to a detail page with an ID
    this.router.navigate(['/home/editactivity', location]);
  }
  redirectToactivityPage(location:any) {
    // Replace with your logic to determine the route based on the clicked location
    // For example, navigating to a detail page with an ID
    this.router.navigate(['/home/activity', location]);
  }
  deleteAct(id:any) {
    // Confirm before deleting
    const userConfirmed = confirm('Are you sure you want to delete this task?');
  
    if (userConfirmed) {
      this.taskservice.deleteActivity(id).subscribe(
        response => {
          alert('Task successfully deleted.');
          // Additional actions if needed
          this.router.navigate(['/home/obj']);
        },
        error => {
          alert('Error during deletion: ' + error.message);
        }
      );
    } else {
      // User clicked 'Cancel', do nothing
      alert('Deletion cancelled.');
    }
  }
  


}
