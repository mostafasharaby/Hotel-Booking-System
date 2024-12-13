import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { FinishPaymentComponent } from './finish-payment/finish-payment.component';


const routes: Routes = [
  { path: 'check-out', component: CheckOutComponent },
  { path: 'finish-payment', component: FinishPaymentComponent },
  { path: 'cart', component: CartComponent },

]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [
    BookingComponent,
    CheckOutComponent,
    FinishPaymentComponent,
    CartComponent
  ]

})
export class BookingModule { }
