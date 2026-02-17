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
    this.logService.getLogs().subscribe((allLogs)=>{
      const latestLog = allLogs[allLogs.length-1];
      if(!latestLog) return;

      const targetDevice = this.devices.find(d=>d.hostname === latestLog.hostname);
      if(targetDevice){
        const msg = latestLog.message.toLowerCase();
        let newStatus : 'online' | 'offline' = targetDevice.status;
        if(msg.includes('down')) newStatus = 'offline';
        if(msg.includes('up')) newStatus='online';

        if(newStatus !== targetDevice.status){
          targetDevice.status = newStatus;
          this.deviceService.updateDevice(targetDevice);
        }
      }
      this.logs=allLogs;
      this.cdr.detectChanges();
    })
  }
}
