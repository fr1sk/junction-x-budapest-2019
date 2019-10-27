import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BalanceComponent } from '../balance/balance.component';
import { IconsModule } from './modules/icons/icons.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, IconsModule, HttpClientModule],
    declarations: [AppComponent, HeaderComponent, BalanceComponent],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {}
