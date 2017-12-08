import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtModule } from '@auth0/angular-jwt';
import { InstitutionComponent } from './institution/institution.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api', 'http://shrpr.dev', 'http://localhost:4200']
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBKUrP69jyLxcicvoZg05Ysqi3rbj1U1Uk'
    }),
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}