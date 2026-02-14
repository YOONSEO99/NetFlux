import { Component, HOST_TAG_NAME, OnInit } from '@angular/core';
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

  get filterDevices(): Device[] {
    if (!this.searchTerm.trim()) return this.devices;

    const result = this.devices.filter(d =>
      d.hostname.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return result;
  }

  sortMode: 'asc' | 'desc' | 'none' = 'none';

  toggleVendorSort(): void {
    if (this.sortMode === 'none') {
      this.devices.sort((a, b) => a.vendor.localeCompare(b.vendor));
      this.sortMode = 'asc';
    } else if (this.sortMode === 'asc') {
      this.devices.sort((a, b) => b.vendor.localeCompare(a.vendor));
      this.sortMode = 'desc';
    } else {
      this.devices = [...this.originalDevices];
      this.sortMode = 'none';
    }
    this.cdr.detectChanges();
  }

  isModalOpen: boolean = false;

  newDevice: Device = {
    id: '',
    hostname: '',
    ipAddress: '',
    vendor: 'Cisco',
    status: 'online',
    rackNo: '',
    description: '',
  };

  onAddDevice(): void {
    if (!this.newDevice.hostname || !this.newDevice.ipAddress) return;
    const newId = `dev-${this.devices.length + 1}`;
    const deviceToPush = {...this.newDevice, id:newId};
    
    // this.newDevice = {
    //   id: newId,
    //   hostname: this.newDevice.hostname,
    //   ipAddress: this.newDevice.ipAddress,
    //   vendor: this.newDevice.vendor,
    //   status: this.newDevice.status,
    //   rackNo: this.newDevice.rackNo,
    //   description: this.newDevice.description,
    // }

    this.devices = [...this.devices, deviceToPush];
    this.originalDevices=[...this.originalDevices, deviceToPush];
    this.deviceService.addDevice(deviceToPush);
    
    this.newDevice = {
      id: '',
      hostname: '',
      ipAddress: '',
      vendor: 'Cisco',
      status: 'online',
      rackNo: '',
      description: '',
    }

    this.isModalOpen = false;
    this.cdr.detectChanges();
  }

}