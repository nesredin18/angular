import { CommonModule, } from '@angular/common';
import { Component,inject,OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskserviceService } from '../taskservice.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Taskin } from '../taskin';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  taskservice: TaskserviceService = inject(TaskserviceService);

  taskForm = new FormGroup({
    Ob_Name: new FormControl(''),
    Ob_Description: new FormControl(''),
    Initial_date: new FormControl(new Date()),
    Final_date: new FormControl(new Date()),
    Status: new FormControl(''),
    Goal: new FormControl(''),
    Result: new FormControl('')
  });

  constructor(private taskService: TaskserviceService, private router: Router) { }
  private formatDateToUTC(): void {
    const initialDate = this.taskForm.value.Initial_date;
    const finalDate = this.taskForm.value.Final_date;
  
    if (initialDate) {
      this.taskForm.patchValue({
        Initial_date: new Date(initialDate.getTime() - (initialDate.getTimezoneOffset() * 60000))
      });
    }
  
    if (finalDate) {
      this.taskForm.patchValue({
        Final_date: new Date(finalDate.getTime() - (finalDate.getTimezoneOffset() * 60000))
      });
    }
  }
  

  submitTask() {
    

    this.taskservice.submitApplication(
      this.taskForm.value.Ob_Name ??'',
      this.taskForm.value.Ob_Description ??'',
      this.taskForm.value.Initial_date ?? new Date(),
      this.taskForm.value.Final_date ?? new Date(),
      this.taskForm.value.Status??'',
      this.taskForm.value.Goal??'',
      this.taskForm.value.Result??'').subscribe(
      response => {
        alert('Task successfully created.');
        this.router.navigate(['/home']);
      },
      error => {
        alert('Error during creation: ' + error.message);
      }
    );
  }
}