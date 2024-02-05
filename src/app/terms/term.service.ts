import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class TermService {

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

  submitApplication(Name: string, Description: string, Initial_date: string, Final_date: string,) {
    const data = {
      Name: Name,
      Description: Description,
      Initial_date: Initial_date,
      Final_date: Final_date,

    };
    return this.http.post(this.url + 'term/', data, this.getHttpOptions());
  }

  async getTermsByObjId(id: number): Promise<any[]> {
    const headers = this.convertHeaders(this.getHttpOptions().headers);
    const response = await fetch(`${this.url + 'term/get/'}${id}`, { headers: headers });
    return await response.json() ?? {};
  }
  updateterm(id: number, Name: string, Description: string, Initial_date: Date, Final_date: Date,) {
    const data = {
      Name: Name,
      Description: Description,
      Initial_date: Initial_date,
      Final_date: Final_date,
 
    };
    const urlWithId = `${this.url+'term/'}${id}`;
    return this.http.put(urlWithId, data, this.getHttpOptions());
  }

  deleteterm(id: number): Observable<any> {
    return this.http.delete(`${this.url+'term/'}${id}`, this.getHttpOptions());
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
  
  async getAllterms(): Promise<Service[]> {
    const headers = this.convertHeaders(this.getHttpOptions().headers);
    const response = await fetch(this.url + 'term', { headers: headers });
    return await response.json() ?? [];
  }
  
  async gettermsById(id: number): Promise<Service> {
    const headers = this.convertHeaders(this.getHttpOptions().headers);
    const response = await fetch(`${this.url + 'term/'}${id}`, { headers: headers });
    return await response.json() ?? {};
  }


  


  
}
