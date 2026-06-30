import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'https://mc-api.solcredio.net/api/queue';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) {}

  getQueue(): Observable<any> {
    return this.http.get(API);
  }

  updateRoom(room: string, number: number): Observable<any> {
    return this.http.put(`${API}/${room}`, { number });
  }
}