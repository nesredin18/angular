import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userprofile } from './login-in';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  url = 'http://localhost:5192/';

  constructor(private http: HttpClient, private router: Router,) {}

  submitApplication(Email: string, Password: string) {
    const data = {
      Email: Email,
      Password: Password,
    };
    return this.http.post(this.url + 'Account/login', data)
}

RegisterUser(Email: string, Password: string) {
  const data = {
    Email: Email,
    Password: Password,
  };
  return this.http.post(this.url + 'Account/register', data)
}

async getUserInfo(): Promise<userprofile> {
  // Retrieve the token from local storage
  const token = localStorage.getItem('authToken');

  // Check if the token exists
  if (!token) {
    console.error('No auth token found');
    // Handle the case where there is no token (e.g., redirect to login)
    return {} as userprofile;
  }

  // Set up the request headers to include the token
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  try {
    const response = await fetch(this.url + 'Account/username', { headers: headers });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse and return the JSON data
    return await response.json() ?? [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return {} as userprofile;
  }
}



}
