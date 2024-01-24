import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
import { HomeComponent } from './home/home.component';
import { EdittaskComponent } from './edittask/edittask.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivityComponent } from './activity/activity.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { NavbarComponent } from './common/navbar/navbar.component';
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'taskdetail', component: TaskdetailComponent },
    { path: 'edittask/:id', component: EdittaskComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'activity', component: ActivityComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'navbar',component:NavbarComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

