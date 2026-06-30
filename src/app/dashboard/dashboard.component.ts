import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from '../services/queue.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  queue: any;
  error = '';
  loading = false;

  constructor(private queueService: QueueService) {}

  ngOnInit() {
    this.loadQueue();
  }

  loadQueue() {
    this.loading = true;
    this.queueService.getQueue().subscribe({
      next: res => {
        this.queue = res;
        this.error = '';
        this.loading = false;
      },
      error: err => {
        console.error('Queue load failed', err);
        this.error = 'Unable to load queue data. Check the API connection.';
        this.loading = false;
      }
    });
  }

  setNumber(room: string, value: string) {
    const num = Number(value);
    if (isNaN(num)) return;

    this.queueService.updateRoom(room, num).subscribe(() => {
      this.loadQueue();
    });
  }

  increment(room: string, current: string) {
    this.queueService.updateRoom(room, Number(current) + 1)
      .subscribe(() => this.loadQueue());
  }

  decrement(room: string, current: string) {
    this.queueService.updateRoom(room, Number(current) - 1)
      .subscribe(() => this.loadQueue());
  }
}