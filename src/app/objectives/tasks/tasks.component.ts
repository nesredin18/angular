import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskserviceService } from '../taskservice.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  taskservice: TaskserviceService = inject(TaskserviceService);

  taskForm = new FormGroup({
    Ob_Name: new FormControl(''),
    Ob_Description: new FormControl(''),
    Initial_date: new FormControl(),
    Final_date: new FormControl(),
    Status: new FormControl(''),
    Goal: new FormControl(''),
    Result: new FormControl('')
  });

  constructor(private taskService: TaskserviceService, private router: Router) { }

  private formatDateToUTC(date: any): Date | null {
    if (!date || !(date instanceof Date)) {
      console.warn('formatDateToUTC called with a non-Date type:', date);
      return null; // or return a default Date if appropriate
    }
  
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  }
  
  submitTask() {
    const initialDate = this.taskForm.value.Initial_date instanceof Date 
      ? this.taskForm.value.Initial_date 
      : new Date(this.taskForm.value.Initial_date);
    const finalDate = this.taskForm.value.Final_date instanceof Date 
      ? this.taskForm.value.Final_date 
      : new Date(this.taskForm.value.Final_date);
  
    // Convert dates to UTC
    const utcInitialDate = this.formatDateToUTC(initialDate);
    const utcFinalDate = this.formatDateToUTC(finalDate);
  
    if (utcInitialDate && utcFinalDate) {
      this.taskservice.submitApplication(
        this.taskForm.value.Ob_Name ?? '',
        this.taskForm.value.Ob_Description ?? '',
        utcInitialDate.toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
        utcFinalDate.toISOString().split('T')[0],   // Format date to 'YYYY-MM-DD'
        // ... other fields
        this.taskForm.value.Status??'',
        this.taskForm.value.Goal??'',
        this.taskForm.value.Result??''
      ).subscribe(
        response => {
          console.log(response);
          alert('Task successfully created.');
          const haveactivity=confirm('Do you want to add activity for this objective?');
          if(haveactivity){
           this.router.navigate(['/home/activity', response]);}
           else{
             this.router.navigate(['/home']);
           }
        },);
    } else {
      console.error('Invalid date format');
      // Handle error for invalid date format
    }
  }
  
}
