import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private apiUrl = 'http://localhost:8085/api/charts';

  constructor(private http: HttpClient) {}

  getChartData(): Observable<any> {
    console.log("Hi getChartData");
    const httpOptions = {'Content-Type':  'application/json', headers: new HttpHeaders({'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add JWT token
    })};

    return this.http.get(this.apiUrl, httpOptions );
  }
}
