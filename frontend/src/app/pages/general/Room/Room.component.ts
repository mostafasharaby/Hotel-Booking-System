import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReloadService } from '../../../shared/service/reload.service';
import { RoomApiService } from './room-service/room-api.service';
import { Subscription } from 'rxjs';
import { SortService } from './room-service/sort.service';
import { SearchService } from './room-service/search.service';
import { FilterCapacityService } from './room-service/filter-capacity.service';
import { FilterPriceService } from './room-service/filter-price.service';
import { FilterSizeService } from './room-service/filter-size.service';
import { CartService } from '../../booking/cart/cart-service/cart.service';
import { Room } from '../../booking/cart/cart-model/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Room',
  templateUrl: './Room.component.html',
  styleUrls: ['./Room.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoomComponent implements AfterViewInit {


  constructor(private reload : ReloadService,
              private roomService :RoomApiService, 
              private sortService :SortService,
              private searchService :SearchService, 
              private filterCapacityService :FilterCapacityService,
              private filterPriceService :FilterPriceService,  
              private filterSizeService :FilterSizeService,
              private cartService :CartService,
              private router : Router
              ) { }
  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }


  searchItem: string = ''; // This will store the search input
  
  filteredCards: any[] = [];
  cards !: any[]; 
  rooms: any[] = [];
  sortOrder: string = 'asc';
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {


    this.getAllRooms();    
    //this.subscriptions.push(

      this.sortService.sortTerm$.subscribe(order => {
        this.sortOrder = order;
         console.log("Received sort order:", order);
        this.sortRoomsByPrice(order);
      }),

      this.sortService.sortTermBySize$.subscribe(order => {
        this.sortOrder = order;
        console.log("Received sort order:", order);
        this.sortRoomsBySize(order);
      }),

      this.sortService.sortTermByCapcity$.subscribe(order => {
        this.sortOrder = order;
        console.log("Received sort order:", order);
        this.sortRoomsByCapacity(order);
      }),

      this.filterCapacityService.capacity$.subscribe((capacity) => {
        this.applyCapacityFilter(capacity);
        console.log("Received", capacity);
      }),

      this.filterPriceService.priceRange$.subscribe(({ minPrice, maxPrice }) => {
        this.applyPriceFilter(minPrice, maxPrice);
      }),

      this.filterSizeService.sizeRange$.subscribe(({ minSize, maxSize }) => {
        this.applySizeFilter(minSize, maxSize);
      }),

      this.roomService.resetObservable$.subscribe((reset) => {
        if (reset) {
          this.filteredCards = this.rooms;
        }
      });
                 
    //)
  }

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }


  
 

  getAllRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;    
        this.filteredCards = data;       
        this.searchService.searchTerm$.subscribe((term) => {
          const query = term.toLowerCase().trim();
          this.search(query);
        });        
        console.log('Rooms:', this.rooms);
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });
  }


  bookNow(room: Room): void {
    console.log('Booking room:', room);
    this.cartService.addCartItem2(room);
  }


  // searchResult: boolean = true;
  // search(searchItem: any) {
  //   this.filteredCards = this.rooms.filter(room =>
  //     room.roomName.toLowerCase().includes(searchItem),
  //     console.log("search  filteredCards", this.filteredCards)
  //   );
  //   this.searchResult = this.filteredCards.length > 0;
  // }
  // sortRoomsByPrice(order: string): void {
  //   this.filteredCards = this.sortService.sortByPrice(this.filteredCards, order);
  //    console.log("filteredCards  sort ",order + " order ",this.filteredCards)
  // }

  // sortRoomsBySize(order: string): void {
  //   this.filteredCards = this.sortService.sortBySize(this.filteredCards, order);
  //   console.log("filteredCards  sort ",order + " order ",this.filteredCards)
  // }

  // sortRoomsByCapacity(order: string): void {
  //   this.filteredCards = this.sortService.sortByCapacity(this.filteredCards, order);
  //   console.log("filteredCards  sort ",order + " order ",this.filteredCards)
  // }


  // applyCapcityFilter(capacity: number | null) {
  //   if (!capacity) {
  //     this.filteredCards = this.rooms;
  //   } else {
  //     this.filteredCards = this.rooms.filter((room) => room.capacity == capacity);
  //     console.log("filteredCards capacity",this.filteredCards);
  //   }
  //   this.searchResult = this.filteredCards.length > 0;
  // }

  // applyPriceFilter(minPrice: number | null, maxPrice: number | null) {
  //   this.filteredCards = this.rooms.filter((room) => {
  //     const meetsMinPrice = minPrice === null || room.price >= minPrice;
  //     const meetsMaxPrice = maxPrice === null || room.price <= maxPrice;
  //     return meetsMinPrice && meetsMaxPrice;
  //   });
  // }

  // applySizeFilter(minSize: number | null, maxSize: number | null) {
  //   this.filteredCards = this.rooms.filter((room) => {
  //     const meetsMinSize = minSize === null || room.size >= minSize;
  //     const meetsMaxSize = maxSize === null || room.size <= maxSize;
  //     return meetsMinSize && meetsMaxSize;
  //   });
  //   this.applyAllFilters();
  // }


  activeFilters: { [key: string]: any } = {};
  searchResult: boolean = true;

  applyAllFilters() {
    this.filteredCards = [...this.rooms];

    Object.values(this.activeFilters).forEach((filterFn) => {
      this.filteredCards = filterFn(this.filteredCards);
    });

    console.log('Filtered Cards:', this.filteredCards);
  }

  
  search(searchItem: string) {
    if (searchItem) {
      this.activeFilters['search'] = (rooms: any[]) =>
        rooms.filter((room) =>
          room.roomName.toLowerCase().includes(searchItem.toLowerCase())
        );
    } else {
      delete this.activeFilters['search'];
    }
    this.applyAllFilters();
  }


  sortRoomsByPrice(order: string): void {
    this.activeFilters['sortPrice'] = (rooms: any[]) =>
      this.sortService.sortByPrice(rooms, order);
    this.applyAllFilters();
  }

  
  sortRoomsBySize(order: string): void {
    this.activeFilters['sortSize'] = (rooms: any[]) =>
      this.sortService.sortBySize(rooms, order);
    this.applyAllFilters();
  }

  
  sortRoomsByCapacity(order: string): void {
    this.activeFilters['sortCapacity'] = (rooms: any[]) =>
      this.sortService.sortByCapacity(rooms, order);
    this.applyAllFilters();
  }

  
  applyCapacityFilter(capacity: number | null) {
    if (capacity !== null) {
      this.activeFilters['capacityFilter'] = (rooms: any[]) =>
        rooms.filter((room) => room.capacity === capacity);
    } else {
      delete this.activeFilters['capacityFilter'];
    }
    this.applyAllFilters();
  }

  
  applyPriceFilter(minPrice: number | null, maxPrice: number | null) {
    if (minPrice !== null || maxPrice !== null) {
      this.activeFilters['priceFilter'] = (rooms: any[]) =>
        rooms.filter((room) => {
          const meetsMinPrice = minPrice === null || room.price >= minPrice;
          const meetsMaxPrice = maxPrice === null || room.price <= maxPrice;
          return meetsMinPrice && meetsMaxPrice;
        });
    } else {
      delete this.activeFilters['priceFilter'];
    }
    this.applyAllFilters();
  }

  
  applySizeFilter(minSize: number | null, maxSize: number | null) {
    if (minSize !== null || maxSize !== null) {
      this.activeFilters['sizeFilter'] = (rooms: any[]) =>
        rooms.filter((room) => {
          const meetsMinSize = minSize === null || room.size >= minSize;
          const meetsMaxSize = maxSize === null || room.size <= maxSize;
          return meetsMinSize && meetsMaxSize;
        });
    } else {
      delete this.activeFilters['sizeFilter'];
    }
    this.applyAllFilters();
  }


  routeToDetails(roomId: number) {
    console.log("room-details",roomId);
    this.router.navigate(['/pages/room-details', roomId]);    
  }
  
}



