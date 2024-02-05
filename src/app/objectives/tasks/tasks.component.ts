import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskserviceService } from '../taskservice.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TermService } from '../../terms/term.service';
import { NgSelectModule } from "@ng-select/ng-select"; 
import { FormsModule } from "@angular/forms"; 
import { Subscription } from 'rxjs';
import { SidebarService } from '../../common/sidebar.service';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,NgMultiSelectDropDownModule,FormsModule,NgSelectModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  private subscription: Subscription;
  status = true;

  constructor(private sidebarService: SidebarService, private router: Router,private fb: FormBuilder,private termservice:TermService) {

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

  taskservice: TaskserviceService = inject(TaskserviceService);
  terms:any=[];
  options:any = [];

  ngOnInit(): void {
    this.termservice.getAllterms().then((terms: any[]) => {
      this.terms = terms;
      this.options = terms.map(term => ({ 
        id: term.id,  // Adjust based on your actual property names
        name: term.name 
      }));
    });
    
    this.taskForm = this.fb.group({
      Ob_Name: new FormControl(''),
      Ob_Description: new FormControl(''),
      Initial_date: new FormControl(),
      Final_date: new FormControl(),
      Status: new FormControl(''),
      Goal: new FormControl(''),
      Result: new FormControl(''),
      ExampleOptions: new FormControl([]) // For multi-select dropdown
    });
  }
  taskForm!: FormGroup;

  onSelectionChange(selectedItems: any[]) {
    const exampleOptionsArray = this.taskForm.get('ExampleOptions') as FormArray;
    exampleOptionsArray.clear();
    selectedItems.forEach(item => exampleOptionsArray.push(new FormControl(item)));
  }

 
  submitTask() {


     {
      this.taskservice.submitApplication(
        this.taskForm.value.ExampleOptions,
        this.taskForm.value.Ob_Name ?? '',
        this.taskForm.value.Ob_Description ?? '',
        this.taskForm.value.Initial_date?? new Date(),
        this.taskForm.value.Final_date?? new Date(), // Format date to 'YYYY-MM-DD'
        // ... other fields
        this.taskForm.value.Status ?? '',
        this.taskForm.value.Goal ?? '',
        this.taskForm.value.Result ?? ''
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
    } 
  
  }


  
}
