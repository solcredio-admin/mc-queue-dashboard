import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QueueService } from '../services/queue.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  queue: any;
  error = '';
  loading = false;

  room1Number = 0;
  room2Number = 0;
  room1Input = '';
  room2Input = '';

  constructor(private queueService: QueueService) {}

  ngOnInit() {
    console.log('DashboardComponent initializing...');
    this.loadQueue();
  }

  loadQueue() {
    console.log('Loading queue...');
    this.loading = true;
    this.error = '';
    this.queueService.getQueue().subscribe({
      next: res => {
        console.log('Queue data received:', res);
        this.queue = res;
        this.room1Number = parseInt(res?.room1?.number) || 0;
        this.room2Number = parseInt(res?.room2?.number) || 0;
        this.error = '';
        this.loading = false;
      },
      error: err => {
        console.error('Queue load failed:', err);
        this.error = `Unable to load queue data: ${err?.message || 'Check the API connection'}`;
        this.loading = false;
      }
    });
  }

  incrementRoom1() {
    const newNum = this.room1Number + 1;
    this.queueService.updateRoom('room1', newNum).subscribe({
      next: () => {
        this.room1Number = newNum;
      },
      error: err => console.error('Update room1 failed', err)
    });
  }

  decrementRoom1() {
    const newNum = Math.max(0, this.room1Number - 1);
    this.queueService.updateRoom('room1', newNum).subscribe({
      next: () => {
        this.room1Number = newNum;
      },
      error: err => console.error('Update room1 failed', err)
    });
  }

  setRoom1Number() {
    if (this.room1Input && !isNaN(parseInt(this.room1Input))) {
      const num = parseInt(this.room1Input);
      this.queueService.updateRoom('room1', num).subscribe({
        next: () => {
          this.room1Number = num;
          this.room1Input = '';
        },
        error: err => console.error('Update room1 failed', err)
      });
    }
  }

  incrementRoom2() {
    const newNum = this.room2Number + 1;
    this.queueService.updateRoom('room2', newNum).subscribe({
      next: () => {
        this.room2Number = newNum;
      },
      error: err => console.error('Update room2 failed', err)
    });
  }

  decrementRoom2() {
    const newNum = Math.max(0, this.room2Number - 1);
    this.queueService.updateRoom('room2', newNum).subscribe({
      next: () => {
        this.room2Number = newNum;
      },
      error: err => console.error('Update room2 failed', err)
    });
  }

  setRoom2Number() {
    if (this.room2Input && !isNaN(parseInt(this.room2Input))) {
      const num = parseInt(this.room2Input);
      this.queueService.updateRoom('room2', num).subscribe({
        next: () => {
          this.room2Number = num;
          this.room2Input = '';
        },
        error: err => console.error('Update room2 failed', err)
      });
    }
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