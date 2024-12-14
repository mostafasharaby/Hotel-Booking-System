import { Component, OnInit } from '@angular/core';
import { SearchService } from '../Room/room-service/search.service';
import { SortService } from '../Room/room-service/sort.service';
import { FilterCapacityService } from '../Room/room-service/filter-capacity.service';
import { FilterPriceService } from '../Room/room-service/filter-price.service';
import { FilterSizeService } from '../Room/room-service/filter-size.service';
import { RoomApiService } from '../Room/room-service/room-api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private searchService :SearchService , 
              private sortingService :SortService ,
              private filterCapcityServic :FilterCapacityService ,  
              private filterPriceService :FilterPriceService ,  
              private filterSizeService :FilterSizeService , 
              private roomService :RoomApiService ,
            ) { }

  ngOnInit() {
  }

    
  isDialogOpen = false; 
  isDialogMounted = false; 
  openDialog(): void {
    this.isDialogOpen = true;
    setTimeout(() => {
      this.isDialogMounted = true;
    }, 10); 
  }
  closeDialog(): void {
    this.isDialogMounted = false;
    setTimeout(() => {
      this.isDialogOpen = false;
    }, 150); 
  }
  confirm(): void {
    console.log('Confirmed');
    this.closeDialog();
  }


  applyFilters() {
    this.searchService.setSearchTerm(this.searchItem?.toLowerCase().trim() || '');
    this.filterSizeService.setSizeRange(this.minSize, this.maxSize);
    this.filterCapcityServic.setCapacity(this.capacity);
    this.filterPriceService.setPriceRange(this.minPrice, this.maxPrice);
  
    switch (this.selectedSortOption) {
      case 'priceAsc':
        this.sortRoomsByPrice('asc');
        break;
      case 'priceDesc':
        this.sortRoomsByPrice('desc');
        break;
      case 'sizeAsc':
        this.sortRoomsBySize('asc');
        break;
      case 'sizeDesc':
        this.sortRoomsBySize('desc');
        break;
      case 'capacityAsc':
        this.sortRoomsByCapacity('asc');
        break;
      case 'capacityDesc':
        this.sortRoomsByCapacity('desc');
        break;
      default:
        console.log('No sorting applied');
    }
  console.log('this.selectedSortOption', this.selectedSortOption);
    console.log('Filters applied:',{
      search: this.searchItem,
      minSize: this.minSize,
      maxSize: this.maxSize,
      capacity: this.capacity,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sortOption: this.selectedSortOption
    });
  }

  
  resetFilters() {
    this.searchItem = '';
    this.minSize = null;
    this.maxSize = null;
    this.capacity = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.roomService.resetRooms();
  }

  
  public searchItem !: string;
  search(event: any) {
    const query = this.searchItem.toLowerCase().trim();
    console.log('Searching ',query , this.searchItem);
    this.searchService.setSearchTerm(query);      
  }


  selectedSortOption: string = "";
  sortRoomsByPrice(sortOrder: string): void {
    console.log("Sorting order set to:", sortOrder);
    this.sortingService.setSortOrder(sortOrder);
    this.selectedSortOption = `Price: ${sortOrder === 'asc' ? 'low to high' : 'high to low'}`;
    console.log("Sorting order set to:", this.selectedSortOption);
  }

  sortRoomsBySize(sortOrder: string): void {
    console.log("Sorting order set to:", sortOrder);
    this.sortingService.sortRoomsBySize(sortOrder);
    this.selectedSortOption = `Size: ${sortOrder === 'asc' ? 'low to high' : 'high to low'}`;
    console.log("Sorting order set to:", this.selectedSortOption);
  }

  sortRoomsByCapacity(sortOrder: string): void {
    console.log("Sorting order set to:", sortOrder);
    this.sortingService.sortRoomByCapcity(sortOrder);
    this.selectedSortOption = `Capcity: ${sortOrder === 'asc' ? 'low to high' : 'high to low'}`;
    console.log("Sorting order set to:", this.selectedSortOption);
  }
  onSortChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedSortOption = (event.target as HTMLSelectElement).value;
    // switch (this.selectedSortOption) {
    //   case 'priceAsc':
    //     this.sortRoomsByPrice('asc');
    //     break;
    //   case 'priceDesc':
    //     this.sortRoomsByPrice('desc');
    //     break;
    //   case 'sizeAsc':
    //     this.sortRoomsBySize('asc');
    //     break;
    //   case 'sizeDesc':
    //     this.sortRoomsBySize('desc');
    //     break;
    //   case 'capacityAsc':
    //     this.sortRoomsByCapacity('asc');
    //     break;
    //   case 'capacityDesc':
    //     this.sortRoomsByCapacity('desc');
    //     break;
    //   default:
    //     console.log("Default sort applied");
    // }
  }
  
  capacity: number | null = null;
  onCapacityChange() {  
    console.log("this.capacity ", this.capacity) ; 
    this.filterCapcityServic.setCapacity(this.capacity);
  }


  minPrice: number | null = null;
  maxPrice: number | null = null;
  onPriceChange() {
    this.filterPriceService.setPriceRange(this.minPrice, this.maxPrice);
    console.log('Min Price:', this.minPrice, 'Max Price:', this.maxPrice);
  }


  minSize: number | null = null;
  maxSize: number | null = null;

  onSizeChange() {
    this.filterSizeService.setSizeRange(this.minSize, this.maxSize);
    console.log('Min Size:', this.minSize, 'Max Size:', this.maxSize);
  }


}



