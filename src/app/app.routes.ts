import { Routes } from '@angular/router';
import { TasksComponent } from './objectives/tasks/tasks.component';
import { TaskdetailComponent } from './objectives/taskdetail/taskdetail.component';
import { HomeComponent } from './home/home.component';
import { EdittaskComponent } from './objectives/edittask/edittask.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { ActivityComponent } from './activities/activity/activity.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { ObjComponent } from './objectives/obj/obj.component';
import { ObjdetailComponent } from './objectives/objdetail/objdetail.component';
import { EditactivityComponent } from './activities/editactivity/editactivity.component';
import { TermComponent } from './terms/term/term.component';
import { EdittermComponent } from './terms/editterm/editterm.component';
import { SeetermsComponent } from './terms/seeterms/seeterms.component';
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] ,children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'tasks', component: TasksComponent },
        { path: 'taskdetail', component: TaskdetailComponent },
        { path: 'edittask/:id', component: EdittaskComponent},
        {path: 'activity/:id', component: ActivityComponent},
        {path: 'editactivity/:id', component: EditactivityComponent},
        {path: 'obj', component: ObjComponent},
        {path: 'objdetail/:id', component: ObjdetailComponent},
        {path:'addterm',component:TermComponent},
        {path:'editterm/:id',component:EdittermComponent},
        {path:'terms',component:SeetermsComponent},
        
        // Other child routes for sidebar navigation
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

      ] },
      
    

    {path: 'register', component: RegisterComponent},

    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

