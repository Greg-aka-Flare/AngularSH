import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketingComponent } from './marketing.component';
import { DigitalComponent } from './digital/digital.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';
import { CustomBrandedComponent } from './custom-branded/custom-branded.component';
import { AutomatedCommunicationComponent } from './automated-communication/automated-communication.component';
import { ReportsDashboardsComponent } from './reports-dashboards/reports-dashboards.component';
import { ReviewsFeedbackComponent } from './reviews-feedback/reviews-feedback.component';
import { FreeTrainingComponent } from './free-training/free-training.component';
import { PricingComponent } from './pricing/pricing.component';
import { FaqsComponent } from './faqs/faqs.component';

const marketingRoutes: Routes = [
	{ path: '', component: MarketingComponent, children: [
		{ path: 'digital', component: DigitalComponent },
		{ path: 'online-payment', component: OnlinePaymentComponent },
		{ path: 'custom-branded', component: CustomBrandedComponent },
		{ path: 'automated-communication', component: AutomatedCommunicationComponent },
		{ path: 'reports-dashboards', component: ReportsDashboardsComponent },
		{ path: 'reviews-feedback', component: ReviewsFeedbackComponent },
		{ path: 'free-training', component: FreeTrainingComponent },
		{ path: 'pricing', component: PricingComponent },
		{ path: 'faqs', component: FaqsComponent }
	] }
];

@NgModule({
	imports: [RouterModule.forChild(marketingRoutes)],
	exports: [RouterModule]
})
export class MarketingRoutingModule{ }