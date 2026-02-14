import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DeviceService } from '../../service/device';
import { Device } from '../../models';
import { Log } from '../../models';
import { LogService } from '../../service/log';

@Component({
  selector: 'app-logs',
  imports: [CommonModule,FormsModule],
  templateUrl: './logs.html',
  styleUrl: './logs.css',
})
export class Logs implements OnInit {
  devices:Device[]=[];
  logs: Log[] = [];

  constructor(
    private logService: LogService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadLogs();
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
