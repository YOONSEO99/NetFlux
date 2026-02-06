import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from './service/device';
import { Device } from './models';
import { LogService } from './service/log';
import { Log } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('NetFlux');

  devices : Device[] = [];

  constructor(
    private deviceService: DeviceService,
    private logService: LogService
  ) {}

  ngOnInit() : void {
    this.loadDevices();
    this.loadLogs();
  }

  loadDevices() : void {
    this.deviceService.getDevices().subscribe({
      next: (data) => {
        this.devices = data;
        console.log("Data load Completed!", this.devices);
      },
      error: (err) => console.error("Error Occured!", err)
    });
  }

  loadLogs() : void{
    this.logService.getLogs().subscribe(log => {
      console.log(`New Log: `,log);
    });
  }
}
