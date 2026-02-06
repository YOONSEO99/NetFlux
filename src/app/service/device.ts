import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../models';
import { MOCK_DEVICES } from '../models/mock-devices'; 


@Injectable({
  providedIn: 'root',
})
export class DeviceService {
    getDevices() : Observable<Device[]>{
      return of(MOCK_DEVICES);
    }
}
