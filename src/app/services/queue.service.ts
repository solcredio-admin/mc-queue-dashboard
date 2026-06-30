import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

const API = '/api/queue';
const REQUEST_TIMEOUT_MS = 10000;

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  getQueue(): Observable<any> {
    return new Observable(subscriber => {
      console.log('Fetching queue data from:', API);
      fetch(API, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          console.log('Fetch response status:', response.status);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Queue data parsed:', data);
          subscriber.next(data);
          subscriber.complete();
        })
        .catch(err => {
          console.error('Fetch error:', err.message);
          subscriber.error(new Error(`API Error: ${err.message}`));
        });
    }).pipe(
      timeout(REQUEST_TIMEOUT_MS)
    );
  }

  updateRoom(room: string, number: number): Observable<any> {
    return new Observable(subscriber => {
      const url = `${API}/${room}`;
      const payload = { number };
      console.log(`Updating ${room} to ${number}...`);
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          console.log(`Update ${room} response status:`, response.status);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(`Update ${room} success:`, data);
          subscriber.next(data);
          subscriber.complete();
        })
        .catch(err => {
          console.error(`Update ${room} error:`, err.message);
          subscriber.error(new Error(`API Error: ${err.message}`));
        });
    }).pipe(
      timeout(REQUEST_TIMEOUT_MS)
    );
  }
}