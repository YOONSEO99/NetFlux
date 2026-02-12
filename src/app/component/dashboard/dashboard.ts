import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DeviceService } from '../../service/device';
import { Device } from '../../models';
import { LogService } from '../../service/log';
import { Log } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  devices: Device[] = [];
  logs: Log[] = [];
  searchTerm: string = "";

  constructor(
    private deviceService: DeviceService,
    private logService: LogService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadDevices();
    this.loadLogs();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (data) => {
        this.devices = data;
        console.log("Data load Completed!", this.devices);
      },
      error: (err) => console.error("Error Occured!", err)
    });
  }

  getStatusCount(status: string): number {
    return this.devices.filter(d => d.status === status).length
  }

  loadLogs(): void {
    this.logService.getLogs().subscribe({
      next: (newLog) => {
        this.logs = [... this.logs, newLog];
        if (this.logs.length > 20) {
          this.logs = this.logs.slice(1);
        }
        this.cdr.detectChanges();
        console.log("Log load completed!", this.logs);
      },
      error: (err) => console.error("Error Occured!", err)
    });
  }

  get filterDevices(): Device[] {
    if (!this.searchTerm.trim()) return this.devices;

    const result = this.devices.filter(d =>
      d.hostname.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return result;

    /* return this.devices.filter(d=> 
    d.hostname.toLowerCase().includes(this.searchTerm.toLowerCase())
  );*/
  }
}