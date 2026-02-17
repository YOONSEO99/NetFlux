import { Injectable } from '@angular/core';
import { timer, map, Observable, of, BehaviorSubject } from 'rxjs';
import { Log } from '../models';
import { Device } from '../models';
import { MOCK_DEVICES } from '../models/mock-devices';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private STORAGE_KEY = 'netflux_logs';
  private logs: Log[] = [];
  private logSubject = new BehaviorSubject<Log[]>(this.logs);

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    this.logs = Array.isArray(parsed) ? parsed : [];

    this.generateLogs().subscribe(newLog => {
      this.logs = [...this.logs, newLog];

      if (this.logs.length > 50) {
        this.logs = this.logs.slice(1);
      }
      this.logSubject.next(this.logs);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.logs));
    })
  }

  getLogs(): Observable<Log[]> {
    return this.logSubject.asObservable();
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

    return timer(0, 4000).pipe(
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
