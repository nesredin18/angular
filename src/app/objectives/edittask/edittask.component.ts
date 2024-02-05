import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,FormBuilder, FormArray, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskserviceService } from '../taskservice.service';
import { Taskin } from '../taskin';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../common/sidebar.service';
import { TermService } from '../../terms/term.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Service } from '../../terms/service';
@Component({
  selector: 'app-edittask',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,NgSelectModule],
  templateUrl: './edittask.component.html',
  styleUrl: './edittask.component.css'
})
 
export class EdittaskComponent {

  terms:any=[];
  options:any = [];
  get exampleOptions(): FormControl {
    return this.taskForm.get('ExampleOptions') as FormControl;
  }


  taskForm!: FormGroup;

  onSelectionChange(selectedItems: any[]) {
    const exampleOptionsArray = this.taskForm.get('ExampleOptions') as FormArray;
    exampleOptionsArray.clear();
    selectedItems.forEach(item => exampleOptionsArray.push(new FormControl(item)));
  }


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

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(TaskserviceService);
  termservice = inject(TermService);
  housingLocation: Taskin | undefined;
  termscol:Service|undefined;
  housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
  private subscription: Subscription;
  status = true;
  constructor(private taskService: TaskserviceService, private fb: FormBuilder, private router: Router,private sidebarService: SidebarService) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
      this.updateFormValues();
    });

    this.termservice.getTermsByObjId(housingLocationId).then(terms => {
      this.terms = terms;

      this.updatedropdown();
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
    console.log('utcInitialDate:', utcInitialDate ?.toISOString().split('T')[0]);
    console.log('utcFinalDate:', utcFinalDate ?.toISOString().split('T')[0]);
    if (this.housingLocation) {
      this.taskForm.patchValue({
        Ob_Name: this.housingLocation.ob_Name,
        Ob_Description: this.housingLocation.ob_Description,
        Initial_date: utcInitialDate?.toISOString().split('T')[0],
        Final_date:utcFinalDate?.toISOString().split('T')[0],
        Status: this.housingLocation.status,
        Goal: String(this.housingLocation.goal) || '',
        Result: String(this.housingLocation.result) || '',

      });
    }
  }
  updatedropdown() {
    if (this.terms) {
      // Extract just the IDs from the terms
      const termIds = this.terms.map((term: { id: any; }) => term.id);
  
      this.taskForm.patchValue({
        ExampleOptions: termIds // Set an array of term IDs
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

  submitTask() {
    const userConfirmed = confirm('Are you sure you want to update this task?');

  if (userConfirmed) {
    console.log(this.taskForm.value.ExampleOptions);
    this.taskService.submitApplication2(
      
      this.taskForm.value.ExampleOptions,
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
        this.router.navigate(['/home/objdetail',this.housingLocationId]);
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