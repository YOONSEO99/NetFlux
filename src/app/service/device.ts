import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../models';
import { MOCK_DEVICES } from '../models/mock-devices'; 


@Injectable({
  providedIn: 'root',
})
export class DeviceService {
    private STORAGE_KEY = 'netflux_devices';
    private devices:Device[] = [];

    constructor(){
      const saved = localStorage.getItem(this.STORAGE_KEY);
      this.devices = saved ? JSON.parse(saved) : [...MOCK_DEVICES]
    }

    private syncToStorage() : void{
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.devices));
    }

    getDevices() : Observable<Device[]>{
      return of(this.devices);
    }

    addDevice(newDevice: Device) : void{
      this.devices = [...this.devices, newDevice];
      this.syncToStorage();
    }

    delDevice(id:string) : void{
      this.devices = this.devices.filter(d=>d.id !==id);
      this.syncToStorage();
    }

    updateDevice(newDevice: Device):void{
      this.devices = this.devices.map(d=>d.id===newDevice.id ? {...newDevice} : d);
      this.syncToStorage();
    }

}
