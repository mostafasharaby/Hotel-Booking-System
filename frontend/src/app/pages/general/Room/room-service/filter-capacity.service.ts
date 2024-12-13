import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterCapacityService {

constructor() { }
private capacitySubject = new BehaviorSubject<number | null>(null); 
  capacity$ = this.capacitySubject.asObservable(); 

  setCapacity(value: number | null) {
    this.capacitySubject.next(value); 
  }
}
