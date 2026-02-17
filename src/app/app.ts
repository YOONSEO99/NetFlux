import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Device } from './models';
import { DeviceService } from './service/device';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref, CommonModule, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {  
  currentDate = new Date();
  nowStatus : string ='';
  devices : Device[] = [];

  constructor(
    private deviceService : DeviceService
  ){
    setInterval(()=>{
      this.currentDate = new Date();
    },1000);
  }

  ngOnInit() : void{
    this.deviceService.getDevices().subscribe((updateDevice)=>{
      this.devices = updateDevice;
      this.nowStatus = this.statusCheck();
    });
  }

  statusCheck() : string{
    const onlineCount = this.devices.filter(d=>d.status==='online').length;
    const offlineCount = this.devices.filter(d=>d.status==='offline').length;
    if(onlineCount<=offlineCount && offlineCount>0){
      return "Warning⚠️";
    }
    return "Healthy✅";
  }
}
