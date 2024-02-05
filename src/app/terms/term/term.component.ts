import { CommonModule, } from '@angular/common';
import { Component,inject,OnInit,HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { TermService } from '../term.service';
import { SidebarService } from '../../common/sidebar.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../sharedservice';

@Component({
  selector: 'app-term',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './term.component.html',
  styleUrl: './term.component.css'
})
export class TermComponent {

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

  termservice: TermService=inject(TermService);

  termForm = new FormGroup({
    Name: new FormControl(''),
    Description: new FormControl(''),
    Initial_date: new FormControl(),
    Final_date: new FormControl(),
  });

  submitTask() {
    

    this.termservice.submitApplication(
      this.termForm.value.Name ??'',
      this.termForm.value.Description ??'',
      this.termForm.value.Initial_date ?? new Date(),
      this.termForm.value.Final_date ?? new Date(),
).subscribe(
      response => {
        
        alert('Term successfully created.');
       const haveactivity=confirm('Do you want to add another Term for this objective?');
       if(haveactivity){
        this.termForm.reset(); }
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
