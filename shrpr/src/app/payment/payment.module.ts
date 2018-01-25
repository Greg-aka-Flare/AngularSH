import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule
  ],
  declarations: [
  	PaymentComponent,
  	CheckoutComponent, 
  	PaymentConfirmComponent, 
  	CartComponent
  ]
})
export class PaymentModule { }
