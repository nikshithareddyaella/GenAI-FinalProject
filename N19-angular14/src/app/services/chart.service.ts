import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private apiUrl = 'https://genai-springboot.onrender.com/api/charts';

  constructor(private http: HttpClient) {}

  getChartData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send JWT token
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(this.apiUrl, httpOptions);
  }
}
