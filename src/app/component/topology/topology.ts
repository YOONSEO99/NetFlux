import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DeviceService } from '../../service/device';
import { Device } from '../../models';
import { LogService } from '../../service/log';
import { Log } from '../../models';

@Component({
  selector: 'app-topology',
  imports: [CommonModule, FormsModule],
  templateUrl: './topology.html',
  styleUrl: './topology.css',
})
export class Topology implements OnInit {
  originalDevices: Device[] = [];
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
        this.originalDevices = [...data];
        console.log("Data load Completed!", this.devices);
      },
      error: (err) => console.error("Error Occured!", err)
    });
  }

  loadLogs(): void {
    this.logService.getLogs().subscribe({
      next: (newLog) => {
        this.logs = [... this.logs, newLog];
        if (this.logs.length > 20) {
          this.logs = this.logs.slice(1);
        }
        this.cdr.detectChanges();

        const targetDevice = this.devices.find(d => d.hostname === newLog.hostname);
        if (targetDevice) {
          if (newLog.message.toLowerCase().includes("down")) {
            targetDevice.status = "offline";
          } else if (newLog.message.toLowerCase().includes("up")) {
            targetDevice.status = "online";
          }
        }
        console.log("Log load completed!", this.logs);
      },
      error: (err) => console.error("Error Occured!", err)
    });
  }

}
