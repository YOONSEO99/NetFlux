import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../service/device';
import { Device } from '../../models';
import { LogService } from '../../service/log';
import { Log } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  devices: Device[] = [];
  logs: Log[] = [];

  constructor(
    private deviceService: DeviceService,
    private logService: LogService
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
      next: (data)=>{
        this.logs = data;
        console.log("Log load completed!", this.logs);
      },
      error: (err) => console.error("Error Occured!", err)
    });
  }
}
