import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {

constructor() { }

private sortItems: BehaviorSubject<string> = new BehaviorSubject< string>('');
  sortTerm$ = this.sortItems.asObservable();

  private sortItemsBySize: BehaviorSubject<string> = new BehaviorSubject< string>('');
  sortTermBySize$ = this.sortItemsBySize.asObservable();
  
  private sortItemsByCapcity: BehaviorSubject<string> = new BehaviorSubject< string>('');
  sortTermByCapcity$ = this.sortItemsByCapcity.asObservable();
  
  setSortOrder(order: string) {
    this.sortItems.next(order);
    console.log("form sort service " ,order )
  }
  sortRoomsBySize(order: string) {
    this.sortItemsBySize.next(order);
  }
  sortRoomByCapcity(order: string) {
    this.sortItemsByCapcity.next(order);
  }

  sortByPrice(rooms: any[], order: string): any[] {
    if (order === 'asc') {
      return rooms.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      return rooms.sort((a, b) => b.price - a.price);
    } else {
      return rooms; 
    }
  }
  sortBySize(rooms: any[], order: string): any[] {
    if (order === 'asc') {
      return rooms.sort((a, b) => a.size - b.size);
    } else if (order === 'desc') {
      return rooms.sort((a, b) => b.size - a.size);
    } else {
      return rooms; 
    }
  }

  sortByCapacity(rooms: any[], order: string): any[] {
    if (order === 'asc') {
      return rooms.sort((a, b) => a.capacity- b.capacity);
    } else if (order === 'desc') {
      return rooms.sort((a, b) => b.capacity- a.capacity);
    } else {
      return rooms; 
    }
  }

}
