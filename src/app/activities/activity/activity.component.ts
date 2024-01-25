import { CommonModule, } from '@angular/common';
import { Component,inject,OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskserviceService } from '../../objectives/taskservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Taskin } from '../../objectives/taskin';
import { response } from 'express';
import { ActivityService } from '../../activity.service';
import { SidebarService } from '../../common/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {



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



  

  submitTask() {
    

    this.taskservice.submitApplication(
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
          this.router.navigate(['/home']);
        }
      },
      error => {
        alert('Error during creation: ' + error.message);
      }
    );
  }
}
