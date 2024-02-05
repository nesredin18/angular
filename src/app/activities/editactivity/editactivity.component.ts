import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Taskin } from '../../objectives/taskin';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../common/sidebar.service';
import { ActivityService } from '../activity.service';
import { Activity } from '../activity';
import { SharedService } from '../../sharedservice';

@Component({
  selector: 'app-editactivity',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './editactivity.component.html',
  styleUrl: './editactivity.component.css'
})
export class EditactivityComponent {
  receivedData: any;
  ngOnInit() {
    this.sharedService.currentData.subscribe(data => {
      this.receivedData = data;
    });
  }

  taskForm = new FormGroup({
    Name: new FormControl(''),
    Description: new FormControl(''),
    Initial_date: new FormControl(),
    Final_date: new FormControl(),
    Status: new FormControl(''),
    Goal: new FormControl(''),
    Result: new FormControl('')
  });

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(ActivityService);
  housingLocation: Activity | undefined;
  housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
  private subscription: Subscription;
  status = true;
  constructor( private sharedService: SharedService,private formBuilder: FormBuilder, private router: Router,private sidebarService: SidebarService) {
    this.housingService.getActivityById(this.housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
      this.updateFormValues();
    });
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

  private formatDateToUTC(date: any): Date | null {
    if (!date || !(date instanceof Date)) {
      console.warn('formatDateToUTC called with a non-Date type:', date);
      return null; // or return a default Date if appropriate
    }
  
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  }
  

  updateFormValues() {
    const initialDate = this.housingLocation?.initial_date instanceof Date 
    ?this.housingLocation?.initial_date
    : new Date(this.housingLocation?.initial_date||'');
  const finalDate =this.housingLocation?.final_date instanceof Date 
    ? this.housingLocation?.final_date
    : new Date(this.housingLocation?.final_date||'');
    const utcInitialDate = this.formatDateToUTC(initialDate);
    const utcFinalDate = this.formatDateToUTC(finalDate);
    if (this.housingLocation) {
      this.taskForm.patchValue({
        Name: this.housingLocation.name,
        Description: this.housingLocation.description,
        Initial_date: utcInitialDate?.toISOString().split('T')[0],
        Final_date:utcFinalDate?.toISOString().split('T')[0],
        Status: this.housingLocation.status,
        Goal: String(this.housingLocation.goal) || '',
        Result: String(this.housingLocation.result) || ''
      });
    }
  }
  logMessage: string = '';
deleteTask() {
  // Confirm before deleting
  const userConfirmed = confirm('Are you sure you want to delete this task?');

  if (userConfirmed) {
    this.housingService.deleteActivity(this.housingLocationId).subscribe(
      response => {
        alert('Task successfully deleted.');
        // Additional actions if needed
        this.router.navigate(['/home/objdetail', this.receivedData]);
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
    const userConfirmed = confirm('Are you sure you want to update this task?');

  if (userConfirmed) {
    this.housingService.UpdateActivity(
      this.housingLocationId,
      this.taskForm.value.Name ?? '',
      this.taskForm.value.Description ?? '',
      this.taskForm.value.Initial_date ?? new Date() ,
      this.taskForm.value.Final_date ?? new Date(),
      this.taskForm.value.Status ?? '',
      this.taskForm.value.Goal ?? '',
      this.taskForm.value.Result ?? ''
    ).subscribe(
      response => {
        alert('Task successfully updated.');
        // Additional actions if needed
        this.router.navigate(['/home/objdetail', this.receivedData]);
      },
      error => {
        alert('Error during updating: ' + error.message);
      }
    );
  }
  else {
    // User clicked 'Cancel', do nothing
    alert('update cancelled.');
  }
}

}
