import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,FormBuilder, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskserviceService } from '../taskservice.service';
import { Taskin } from '../taskin';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  Loginservice:LoginService= inject(LoginService)
    taskForm = new FormGroup({
      Email: new FormControl(''),
      Password: new FormControl(''),
      Confirm_Password: new FormControl(''),
    });

    constructor(private router:Router) { }
    submitTask() {
      if (this.taskForm.value.Password !== this.taskForm.value.Confirm_Password) {
        alert('Passwords do not match.');
        return;
      }
      this.Loginservice.RegisterUser(
        this.taskForm.value.Email ?? '',
        this.taskForm.value.Password ?? '',
      ).subscribe(
        response => {
          alert('Task successfully created.');
          // Additional actions if needed
          this.router.navigate(['login']);
        },
        error => {
          alert('Error during creation: ' + error.message);
        }
      );
    }

}
