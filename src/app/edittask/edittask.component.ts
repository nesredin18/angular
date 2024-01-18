import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,FormBuilder, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskserviceService } from '../taskservice.service';
import { Taskin } from '../taskin';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edittask',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './edittask.component.html',
  styleUrl: './edittask.component.css'
})
 
export class EdittaskComponent {
  taskForm = new FormGroup({
    Ob_Name: new FormControl(''),
    Ob_Description: new FormControl(''),
    Initial_date: new FormControl(new Date()),
    Final_date: new FormControl(new Date()),
    Status: new FormControl(''),
    Goal: new FormControl(''),
    Result: new FormControl('')
  });

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(TaskserviceService);
  housingLocation: Taskin | undefined;
  housingLocationId = parseInt(this.route.snapshot.params['id'], 10);

  constructor(private taskService: TaskserviceService, private formBuilder: FormBuilder, private router: Router) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
      this.updateFormValues();
    });
  }

  updateFormValues() {
    if (this.housingLocation) {
      this.taskForm.patchValue({
        Ob_Name: this.housingLocation.ob_Name,
        Ob_Description: this.housingLocation.Ob_Description,
        Initial_date: this.housingLocation.Initial_date,
        Final_date: this.housingLocation.Final_date,
        Status: this.housingLocation.Status,
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
    this.taskService.deleteTask(this.housingLocationId).subscribe(
      response => {
        alert('Task successfully deleted.');
        // Additional actions if needed
        this.router.navigate(['/taskdetail']);
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
    this.taskService.submitApplication2(
      this.housingLocationId,
      this.taskForm.value.Ob_Name ?? '',
      this.taskForm.value.Ob_Description ?? '',
      this.taskForm.value.Initial_date ?? new Date() ,
      this.taskForm.value.Final_date ?? new Date(),
      this.taskForm.value.Status ?? '',
      this.taskForm.value.Goal ?? '',
      this.taskForm.value.Result ?? ''
    ).subscribe(
      response => {
        alert('Task successfully updated.');
        // Additional actions if needed
        this.router.navigate(['/taskdetail']);
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
}}