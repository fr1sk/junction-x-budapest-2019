import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BalanceComponent } from '../balance/balance.component';
import { IconsModule } from './icons/icons.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, IconsModule, HttpClientModule],
    declarations: [AppComponent, HeaderComponent, BalanceComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
