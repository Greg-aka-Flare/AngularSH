import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MarketingRoutingModule } from './marketing-routing.module';
import { MarketingComponent } from './marketing.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';
import { CustomBrandedComponent } from './custom-branded/custom-branded.component';
import { AutomatedCommunicationComponent } from './automated-communication/automated-communication.component';
import { ReportsDashboardsComponent } from './reports-dashboards/reports-dashboards.component';
import { ReviewsFeedbackComponent } from './reviews-feedback/reviews-feedback.component';
import { FreeTrainingComponent } from './free-training/free-training.component';
import { PricingComponent } from './pricing/pricing.component';
import { FaqsComponent } from './faqs/faqs.component';
import { MarketingFormComponent } from './marketing-form.component';
import { MarketingNavComponent } from './marketing-nav.component';
import { DigitalComponent } from './digital/digital.component';

@NgModule({
  declarations: [
    MarketingComponent,
    OnlinePaymentComponent,
    CustomBrandedComponent,
    AutomatedCommunicationComponent,
    ReportsDashboardsComponent,
    ReviewsFeedbackComponent,
    FreeTrainingComponent,
    PricingComponent,
    FaqsComponent,
    MarketingFormComponent,
    MarketingNavComponent,
    DigitalComponent
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MarketingModule { }