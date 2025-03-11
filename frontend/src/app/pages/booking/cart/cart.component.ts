import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ReloadService } from '../../../shared/service/reload.service';
import { Subscription } from 'rxjs';
import { CartService } from './cart-service/cart.service';
import { Reservation, ReservedRoom, Room } from './cart-model/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit,OnDestroy {

  cartItems: Room [] =[];
  totalPrice ?: number = 0;
  cartSubscription !: Subscription;

  constructor(private reload: ReloadService,
              private cartService: CartService) {    
                
    this.totalPrice = 0;
  }
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    console.log('BlogComponent destroyed');
  }
  ngAfterViewInit(): void {
    this.reload.initializeLoader();
  }


  ngOnInit() {
    this.cartSubscription =
    this.cartService.getCartItems().subscribe(
      (reservedRoom: ReservedRoom[]) => {
        if (reservedRoom) {
          this.cartItems = reservedRoom.map(item => item.room); 
          this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
          console.log('Fetched reserved rooms:',this.cartItems , this.cartItems.length);
        } else {
          console.log('No items in the cart');
        }
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  deleteCartItem(cartId: number): void {
    this.cartService.deleteCartItem(cartId).subscribe(
      () => {
        this.cartItems = this.cartItems.filter(item => item.roomID !== cartId);
        console.log("cartItems length:", this.cartItems.length);
        this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
        this.cartService.cartItemsSubject.next( this.cartItems);
        console.log(`Cart item with ID ${cartId} has been deleted.`);
      },
      (error) => {
        console.error('Error deleting cart item:', error);
      }
    );
  }
}
