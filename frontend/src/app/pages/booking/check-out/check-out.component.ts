import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { check } from './check-out-model/check';
import { ReloadService } from '../../../shared/service/reload.service';
import { ReservedRoom, Room } from '../cart/cart-model/cart';
import { CartService } from '../cart/cart-service/cart.service';
import { PaymentServiceService } from './payment-service/payment-service.service';
import { SnakebarService } from '../../../shared/service/SnakebarService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor(private fb: FormBuilder ,
              private reload : ReloadService , 
              private cartService : CartService,
              private invoiceGuestService: PaymentServiceService,
              private snakebar :SnakebarService,
              private router : Router
            ) {}
  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }
  ngOnInit() {
     //this.cartSubscription =
    this.initForm();
    this.loadItems();
  }
  contactForm!: FormGroup;

  get name() {
    return this.contactForm.get('name');
  }
  
  get email() {
    return this.contactForm.get('email');
  }
  
  get streetAddress() {
    return this.contactForm.get('streetAddress');
  }

  get city() {
    return this.contactForm.get('city');
  }

  get state() {
    return this.contactForm.get('state');
  }

  get postalCode() {
    return this.contactForm.get('postalCode');
  }


  get cardholderName() {
    return this.contactForm.get('cardholderName');
  }

  get cardNumber() {
    return this.contactForm.get('cardNumber');
  }

  get exp() {
    return this.contactForm.get('exp');
  }

  get cvv() {
    return this.contactForm.get('cvv');
  }

  
  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      cardholderName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], 
      exp: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],  
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]  
    });
  }

  invoiceGuest = {    
    tsPaid: new Date(),  
    status:0
  };  


  onSubmit(): void {
    if (this.contactForm.valid) {
      const shippingInfo: check = this.contactForm.value;
      console.log('Form Submitted', shippingInfo);

      this.invoiceGuest.status = 1 ; //paid 
      this.invoiceGuestService.postInvoiceGuest(this.invoiceGuest).subscribe({
        next: (response) => {
          console.log('Invoice created successfully:', response);
          this.snakebar.showSnakeBar('Invoice created successfully!');
          this.router.navigate(['booking/finish-payment']);
        },
        error: (error) => {
          console.error('Error creating invoice:', error);
          this.snakebar.showSnakeBar('Error creating invoice.');
          this.invoiceGuest.status = 0;
        }
      });
    }
  }


  checkoutItems!: Room [];
  totalPrice: number=0;
  loadItems(){
    this.cartService.getCartItems().subscribe(
      (reservedRoom: ReservedRoom[]) => {
        if (reservedRoom) {
          this.checkoutItems = reservedRoom.map(item => item.room); 
          this.totalPrice = this.checkoutItems.reduce((sum, item) => sum + item.price, 0);
          console.log('Fetched reserved rooms:',this.checkoutItems , this.totalPrice);
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
