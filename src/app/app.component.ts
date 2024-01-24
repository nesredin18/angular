import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import{ TasksComponent } from './tasks/tasks.component';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {SidebarComponent} from './common/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import{ NavbarComponent } from './common/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLinkActive,RouterLink,HttpClientModule,HomeComponent,SidebarComponent,DashboardComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'planning';
}
