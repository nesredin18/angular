import { Observable } from 'rxjs';
import { Taskin } from './objectives/taskin';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  url = 'http://localhost:5192/';

  constructor(private http: HttpClient, private router: Router) {}

  private getHttpOptions() {
    // Retrieve the token from local storage
    const token = localStorage.getItem('authToken');
    // Set up the request headers to include the token
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return httpOptions;
  }

  submitApplication(Objective_ID:number,Ob_Name: string, Ob_Description: string, Initial_date: string, Final_date: string, Status: string, Goal: string, Result: string) {
    const data = {
      Objective_id:Objective_ID,
      Name: Ob_Name,
      Description: Ob_Description,
      Initial_date: Initial_date,
      Final_date: Final_date,
      Status: Status,
      Goal: Goal,
      Result: Result,
      Objective_ID: Objective_ID
    };
    return this.http.post(this.url + 'activity/', data, this.getHttpOptions());
  }

  submitApplication2(id: number, Ob_Name: string, Ob_Description: string, Initial_date: Date, Final_date: Date, Status: string, Goal: string, Result: string) {
    const data = {
      Name: Ob_Name,
      Description: Ob_Description,
      Initial_date: Initial_date,
      Final_date: Final_date,
      Status: Status,
      Goal: Goal,
      Result: Result
    };
    const urlWithId = `${this.url+'activity/'}${id}`;
    return this.http.put(urlWithId, data, this.getHttpOptions());
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.url+'activity/'}${id}`, this.getHttpOptions());
  }

  private convertHeaders(httpHeaders: HttpHeaders): Record<string, string> {
    let headers: Record<string, string> = {};
    httpHeaders.keys().forEach(key => {
      const headerValue = httpHeaders.get(key);
      if (headerValue !== null) {
        headers[key] = headerValue;
      }
    });
    return headers;
  }
  
  async getAllHousingLocations(): Promise<Taskin[]> {
    const headers = this.convertHeaders(this.getHttpOptions().headers);
    const response = await fetch(this.url + 'activity', { headers: headers });
    return await response.json() ?? [];
  }
  
  async getHousingLocationById(id: number): Promise<Taskin> {
    const headers = this.convertHeaders(this.getHttpOptions().headers);
    const response = await fetch(`${this.url + 'activity/'}${id}`, { headers: headers });
    return await response.json() ?? {};
  }
  
}
