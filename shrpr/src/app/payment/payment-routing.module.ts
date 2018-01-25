import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentComponent } from './payment.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';

const paymentRoutes: Routes = [
	{ path: '', component: PaymentComponent, children: [
		{ path: 'cart', component: CartComponent },
		{ path: 'checkout', component: CheckoutComponent  },
		{ path: 'confirm', component: PaymentConfirmComponent }
	] }
];

@NgModule({
	imports: [RouterModule.forChild(paymentRoutes)],
	exports: [RouterModule]
})
export class PaymentRoutingModule{ }