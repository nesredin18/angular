import { CommonModule, } from '@angular/common';
import { Component,inject,OnInit,HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ActivityService } from '../activity.service';
import { SidebarService } from '../../common/sidebar.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../sharedservice';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.needToConfirm()) {
      $event.returnValue = true;
      

    }
    this.router.navigate(['/home/objdetail',this.receivedData]);
  }

  

  needToConfirm(): boolean {
    return this.completed; // 
  }

  receivedData: any;
  completed:boolean=true;
  ngOnInit() {
    this.sharedService.currentData.subscribe(data => {
      this.receivedData = data;
    });
  }


  private subscription: Subscription;
  status = true;

  constructor(private sidebarService: SidebarService,private router: Router,private sharedService:SharedService) {
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
  taskservice: ActivityService = inject(ActivityService);

  taskForm = new FormGroup({
    Ob_Name: new FormControl(''),
    Ob_Description: new FormControl(''),
    Initial_date: new FormControl(),
    Final_date: new FormControl(),
    Status: new FormControl(''),
    Goal: new FormControl(''),
    Result: new FormControl('')
  });

  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = parseInt(this.route.snapshot.params['id'], 10);


  deleteTask() {
    // Confirm before deleting
    const userConfirmed = confirm('Are you sure you want to delete this task?');
  
    if (userConfirmed) {
      this.taskservice.deleteActivity(this.housingLocationId).subscribe(
        response => {
          alert('Task successfully deleted.');
          this.completed=false;
          // Additional actions if needed
          this.router.navigate(['/home/objdetail',this.receivedData]);
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
  

  submitTask() {
    

    this.taskservice.CreateActivity(
      this.housingLocationId,
      this.taskForm.value.Ob_Name ??'',
      this.taskForm.value.Ob_Description ??'',
      this.taskForm.value.Initial_date ?? new Date(),
      this.taskForm.value.Final_date ?? new Date(),
      this.taskForm.value.Status??'',
      this.taskForm.value.Goal??'',
      this.taskForm.value.Result??'').subscribe(
      response => {
        
        alert('Activity successfully created.');
       const haveactivity=confirm('Do you want to add another activity for this objective?');
       if(haveactivity){
        this.taskForm.reset(); }
        else{
          this.completed=false;
          if(this.receivedData){
          this.router.navigate(['/home/objdetail',this.receivedData]);}
          else{
            this.router.navigate(['/home'])
          }
        }
      },
      error => {
        alert('Error during creation: ' + error.message);
      }
    );
  }
}
