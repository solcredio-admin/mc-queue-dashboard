import { Component, OnInit } from '@angular/core';
import { QueueService } from '../services/queue.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  queue: any;

  constructor(private queueService: QueueService) {}

  ngOnInit(): void {
    this.loadQueue();
  }

  loadQueue() {
    this.queueService.getQueue().subscribe(res => {
      this.queue = res;
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