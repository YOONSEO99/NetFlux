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
    private deviceService: DeviceService,
    private logService: LogService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.logService.getLogs().subscribe((allLogs)=>{
      const latestLog = allLogs[allLogs.length-1];
      if(!latestLog) return;

      const targetDevice = this.devices.find(d=>d.hostname === latestLog.hostname);
      if(targetDevice){
        const msg = latestLog.message.toLowerCase();
        let newStatus : 'online' | 'offline' = targetDevice.status;
        if(msg.includes('down')) newStatus='offline';
        if(msg.includes('up')) newStatus='online';

        if(newStatus !== targetDevice.status){
          targetDevice.status = newStatus;
          this.deviceService.updateDevice(targetDevice);
        }
      }
      this.logs=allLogs;
      this.cdr.detectChanges();
    });
  }
}
