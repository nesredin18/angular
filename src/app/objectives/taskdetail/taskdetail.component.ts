import { Component, inject, } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { Taskin } from '../taskin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import{HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-taskdetail',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,RouterLink],
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.css'
})
export class TaskdetailComponent {
  
  housingService: TaskserviceService = inject(TaskserviceService)
  housingLocationList: Taskin[] = [];
  filteredLocationList: Taskin[] = [];
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: Taskin[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }


}
