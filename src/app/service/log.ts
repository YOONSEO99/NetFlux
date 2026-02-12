import { Injectable } from '@angular/core';
import { timer, map, Observable, of } from 'rxjs';
import { Log } from '../models';
import { Device } from '../models';
import { MOCK_DEVICES } from '../models/mock-devices';

@Injectable({
  providedIn: 'root',
})
export class LogService {

  //mock data
  // private mockLogs: Log[] = [
  //   { id: '1', deviceId: '9', hostname: 'Cloud-SW-01', timestamp: new Date('2026-02-10 15:50'), message: 'Link Down', type: 'ERROR' },
  //   { id: '2', deviceId: '2', hostname: 'Border-SW-02', timestamp: new Date('2026-02-10 19:27'), message: 'Config Changed', type: 'INFO' }
  // ];

  getLogs(): Observable<Log> {
    return this.generateLogs();
  }

  generateLogs(): Observable<Log> {
    const eventTemplates = [
      { message: 'Link Down', type: 'ERROR' },
      { message: 'High CPU Usage', type: 'WARNING' },
      { message: 'Config Changed', type: 'INFO' },
      { message: 'Interface Up', type: 'INFO' },
      { message: 'Link Up', type: 'INFO' },
      { message: 'Interface Down', type: 'ERROR' },
      { message: 'High Memory Usage', type: 'WARNING' },
      { message: 'High Bandwidth Utilization', type: 'WARNING' },
      { message: 'SNMP Timeout', type: 'WARNING' }
    ];

    return timer(0,4000).pipe(
      map((index) => {
        //choose random device
        const device = MOCK_DEVICES[Math.floor(Math.random() * MOCK_DEVICES.length)];
        //choose random event template
        const event = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];

        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        return {
          id: (index + 1).toString(),
          deviceId: device.id,
          hostname: device.hostname,
          timestamp: timeString,
          message: event.message,
          type: event.type
        } as Log;
      })
    );
  }
}
