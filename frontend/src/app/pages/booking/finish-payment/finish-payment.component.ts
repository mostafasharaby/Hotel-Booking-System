import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReservedRoom, Room } from '../cart/cart-model/cart';
import { CartService } from '../cart/cart-service/cart.service';
import { ReloadService } from '../../../shared/service/reload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-finish-payment',
  templateUrl: './finish-payment.component.html',
  styleUrls: ['./finish-payment.component.css']
})
export class FinishPaymentComponent implements OnInit, OnDestroy {

  paymentSubscription!: Subscription;
  today: number = Date.now();
  checkoutItems!: Room[];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private reload: ReloadService) { }

  ngOnInit() {
    this.loadItems();
  }
  ngAfterViewInit(): void {
    this.reload.initializeLoader();
  }
  ngOnDestroy(): void {
    if (this.paymentSubscription) {
      this.paymentSubscription.unsubscribe();
    }
    console.log('FinishPaymentComponent destroyed');
  }


  loadItems() {
    this.cartService.getCartItems().subscribe(
      (reservedRoom: ReservedRoom[]) => {
        if (reservedRoom) {
          this.checkoutItems = reservedRoom.map(item => item.room);
          this.totalPrice = this.checkoutItems.reduce((sum, item) => sum + item.price, 0);
          console.log('Fetched reserved totalPrice:', this.totalPrice);
        } else {
          console.log('No items in the cart');
        }
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }


}
