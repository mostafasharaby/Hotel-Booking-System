import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterSizeService {

constructor() { }
private sizeRangeSubject = new BehaviorSubject<{ minSize: number | null; maxSize: number | null }>({
  minSize: null,
  maxSize: null,
});

sizeRange$ = this.sizeRangeSubject.asObservable(); // Observable for price range

setSizeRange(minSize: number | null, maxSize: number | null) {
  this.sizeRangeSubject.next({ minSize, maxSize });
}
}
