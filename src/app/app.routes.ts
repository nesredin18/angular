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
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] ,children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'tasks', component: TasksComponent },
        { path: 'taskdetail', component: TaskdetailComponent },
        { path: 'edittask/:id', component: EdittaskComponent},
        {path: 'activity/:id', component: ActivityComponent},
        // Other child routes for sidebar navigation
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

      ] },
    

    {path: 'register', component: RegisterComponent},

    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

