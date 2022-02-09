import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusUrl = '/api/status';

  constructor(private http: HttpClient) { }

  // Get the status
  getStatus(){
    return this.http.get(this.statusUrl);
  }

  getRepo(){
    return this.http.get('api/randomrepo');
  }
}