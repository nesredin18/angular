import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../login.service';
import { userprofile } from '../login-in';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../common/navbar/navbar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLinkActive,RouterLink,HttpClientModule,CommonModule,SidebarComponent,DashboardComponent,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userpservice: LoginService = inject(LoginService);
  userp: userprofile | undefined;
 // Now expecting a single object
  
 constructor() {
  this.userpservice.getUserInfo().then(userp => {
    this.userp = userp;
    console.log(userp);
  });

  
}
status = false;
addToggle()
{
  this.status = !this.status;       
}

  

}