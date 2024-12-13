import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterPriceService {

constructor() { }
private priceRangeSubject = new BehaviorSubject<{ minPrice: number | null; maxPrice: number | null }>({
  minPrice: null,
  maxPrice: null,
});

priceRange$ = this.priceRangeSubject.asObservable(); // Observable for price range

setPriceRange(minPrice: number | null, maxPrice: number | null) {
  this.priceRangeSubject.next({ minPrice, maxPrice });
}
}
