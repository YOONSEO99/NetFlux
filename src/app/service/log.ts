import { Injectable } from '@angular/core';
import { interval, map, Observable, of } from 'rxjs';
import { Log } from '../models';
import { Device } from '../models';
import { MOCK_DEVICES } from '../models/mock-devices';

@Injectable({
  providedIn: 'root',
})
export class LogService {

  //mock data
  private mockLogs : Log[] = [
    { id:'1', deviceId:'9', hostname: 'Cloud-SW-01', timestamp:new Date('2026-02-10 15:50') ,message: 'Link Down', type: 'ERROR'},
    { id:'2', deviceId:'2', hostname: 'Border-SW-02', timestamp:new Date('2026-02-10 19:27'), message: 'Config Changed', type: 'INFO' }
  ];

  getLogs(): Observable<Log[]> {
    return of(this.mockLogs)
  }
}
