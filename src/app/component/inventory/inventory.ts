import { Component, OnInit } from '@angular/core';
import { Device } from '../../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../../service/device';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit {
  originalDevices: Device[] = [];
  devices: Device[] = [];
  searchTerm: string = "";

  constructor(
    private deviceService: DeviceService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadDevices();
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
    const deviceToPush = { ...this.newDevice, id: newId };

    this.devices = [...this.devices, deviceToPush];
    this.originalDevices = [...this.originalDevices, deviceToPush];
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

  isEditMode: boolean = false;

  onEditDevice(device: Device): void {
    this.isEditMode = true;
    this.isModalOpen = true;

    this.newDevice = { ...device };
  }

  resetForm(): void {
    this.newDevice = {
      id: '',
      hostname: '',
      ipAddress: '',
      vendor: 'Cisco',
      status: 'online',
      rackNo: '',
      description: '',
    };
  }

  openAddModal(): void {
    this.resetForm();
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  onUpdateDevice(): void {
    this.devices = this.devices.map(d =>
      d.id === this.newDevice.id ? { ...this.newDevice } : d
    );

    this.originalDevices = [...this.devices];
    this.deviceService.updateDevice(this.newDevice);

    this.newDevice = {
      id: '',
      hostname: '',
      ipAddress: '',
      vendor: 'Cisco',
      status: 'online',
      rackNo: '',
      description: '',
    }

    this.isEditMode = false;
    this.isModalOpen = false;
    this.cdr.detectChanges();
  }

  onDeleteDevice(id: string): void {
    if (confirm('Are you sure to delete it?')) {
      this.devices = this.devices.filter(d => d.id !== id);
      this.originalDevices = this.originalDevices.filter(d => d.id !== id);
      this.deviceService.delDevice(id);
      this.cdr.detectChanges();
    }
  }
}
