import { Injectable } from '@angular/core';
import { interval, map, Observable, of } from 'rxjs';
import { Log } from '../models';
import { Device } from '../models';
import { MOCK_DEVICES } from '../models/mock-devices';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  getLogs() : Observable<string>{
    return interval(2000).pipe(
      map(i=> `System Log #${i}: Device ${i} is responding... `)
    );
  }
}
