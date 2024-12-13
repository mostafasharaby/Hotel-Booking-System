import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SnakebarService } from '../../../../shared/service/SnakebarService.service';
import { AuthServiceService } from '../../../auth/auth-services/auth-service.service';
import { HandleErrorsService } from '../../../../shared/service/handle-errors.service';
import { CartDTO, Reservation, ReservedRoom, Room } from '../cart-model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private http: HttpClient,
  private snakebar: SnakebarService,
  private authService : AuthServiceService,
 private handeErrorService : HandleErrorsService) { }

private cartApi = `${environment.api}/Reservations`; 
private cartApi2 = `${environment.api}/ReservedRooms`; 


public cartItemsSubject = new BehaviorSubject<any[]>([]);
cartItems$ = this.cartItemsSubject.asObservable();

public search = new BehaviorSubject<string>("");

getCartItems(): Observable<ReservedRoom[]> {
  const headers = this.authService.getHeaders();
  return this.http.get<ReservedRoom[]>(this.cartApi2, { headers }).pipe(
    tap((reservedRooms: ReservedRoom[]) => {
      this.cartItemsSubject.next(reservedRooms);
      console.log('Reservation fetched from API:', reservedRooms.length);
    }),
    catchError(this.handeErrorService.handleError)
  );
}

addCartItem2(item: Room) {
 const currentItems = this.cartItemsSubject.value;
 const existingIndex = currentItems.findIndex((i) => i.roomID === item.roomID);

 if (existingIndex !== -1) {   
  this.snakebar.showSnakeBar(`Room is already booked!`);
   console.log("item exist in the cart ", item)
 } else {
    currentItems.push(item);
    console.log("lenght of cart ", currentItems.length)
    this.cartItemsSubject.next(currentItems);
    const CartDTO: CartDTO = { roomId: item.roomID, price: item.price };
    //console.log("CartDTO ", CartDTO.roomId, item.price);
    this.snakebar.showSnakeBar(`Room successfully booked!`);
    this.saveCartToBackend(CartDTO).subscribe(
      (response: any) => {
        console.log('Cart item added successfully to the server', response);
      },
      (error: any) => {
        console.error('Error adding cart item to the server', error);
      }
    );
  }
}

saveCartToBackend(cart: CartDTO): Observable<CartDTO> {
 const headers = this.authService.getHeaders();  
 return this.http.post<CartDTO>(this.cartApi, cart, { headers }).pipe(
   catchError(this.handeErrorService.handleError)
 );
}

emptyCartItems() {
 const removeAll = this.cartItemsSubject.value;
 removeAll.length = 0;
 this.cartItemsSubject.next(removeAll);
}

deleteCartItem(cartId: number): Observable<any> {
 const headers = this.authService.getHeaders();  
 const deleteUrl = `${this.cartApi2}/${cartId}`;
 console.log("deleteUrl", deleteUrl);
 this.snakebar.showSnakeBar(`Room booking has been removed.`);
 return this.http.delete(deleteUrl, { headers }).pipe(
   catchError(this.handeErrorService.handleError)
 );
 
}

getCartItemByProductId(productId: string): Observable<any | null> {
 const headers = this.authService.getHeaders();  // Get the headers with the token
 return this.http.get<any | null>(`${this.cartApi}/GetByProduct/${productId}`, { headers }).pipe(
   tap((response) => {
     console.log('Existing any item:', response);
   }),
   catchError(this.handeErrorService.handleError)
 );
}
updateanyItem(cartItem: any): Observable<any> {
 return this.http.put<any>(`${this.cartApi}/${cartItem.id}`, cartItem);
}  

}
