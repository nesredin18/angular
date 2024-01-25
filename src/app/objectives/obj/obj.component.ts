import { Component, inject, } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { Taskin } from '../taskin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import{HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-obj',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,RouterLink],
  templateUrl: './obj.component.html',
  styleUrl: './obj.component.css'
})
export class ObjComponent {

  housingService: TaskserviceService = inject(TaskserviceService)
  housingLocationList: Taskin[] = [];
  filteredLocationList: Taskin[] = [];
  constructor(private router: Router) {
    this.housingService.getAllHousingLocations().then((housingLocationList: Taskin[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  redirectToPage(location:any) {
    // Replace with your logic to determine the route based on the clicked location
    // For example, navigating to a detail page with an ID
    this.router.navigate(['/home/objdetail', location]);
  }

}
