import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CheckoutComponent, PaymentConfirmComponent]
})
export class PaymentModule { }
