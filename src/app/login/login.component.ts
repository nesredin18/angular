import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,FormBuilder, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskserviceService } from '../taskservice.service';
import { Taskin } from '../taskin';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Loginservice:LoginService= inject(LoginService)
    taskForm = new FormGroup({
      Email: new FormControl(''),
      Password: new FormControl(''),
    });

    constructor(private router:Router) { }

    submitTask() {
      this.Loginservice.submitApplication(
        this.taskForm.value.Email ?? '',
        this.taskForm.value.Password ?? '',
      ).subscribe(
        (response: any) => {
          // Assuming the response contains a token
          const token = response.token;
    
          if (token) {
            // Save the token in local storage
            localStorage.setItem('authToken', token);
    
            alert('You have successfully logged in.');
            // Additional actions if needed
            this.router.navigate(['/home']);
          } else {
            // Handle cases where task was created but no token is returned
            alert('Task created, but no authentication token received.');
          }
        },
        error => {
          alert('Error during creation: ' + error.message);
        }
      );
    }

    checkToken() {
      const token = localStorage.getItem('authToken');
      if (token) {
        console.log('Token found:', token);
        // Perform actions if token exists
      } else {
        console.log('No token found');
        // Handle the absence of token
      }
    }
    

}
