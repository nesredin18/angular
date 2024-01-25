import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskserviceService } from '../taskservice.service';
import { Taskin } from '../taskin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-objdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './objdetail.component.html',
  styleUrl: './objdetail.component.css'
})
export class ObjdetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(TaskserviceService);
  housingLocation: Taskin | undefined;
  housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
  housingLocationList: Taskin[] = [];

  constructor( private router: Router) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
    this.housingService.getHousingLocationByObjId(housingLocationId).then((housingLocationList: Taskin[]) => {
      this.housingLocationList = housingLocationList;
    });
  }


}
