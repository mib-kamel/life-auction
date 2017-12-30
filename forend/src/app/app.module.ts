import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EnterComponent } from './enter/enter.component';

import { routing } from './app.routes';
import { UserContentComponent } from './user-content/user-content.component';
import { StatsComponent } from './user-content/stats/stats.component';
import { InventoryComponent } from './user-content/inventory/inventory.component';
import { AuctionComponent } from './user-content/auction/auction.component';
import { NotificationsComponent } from './user-content/notifications/notifications.component';
import { CurrentUserService } from './current-user.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ContentAuthGuard } from './content-auth-guard.service';
import { LoginAuthGuard } from './login-auth-guard.service';
import { AuctionService } from './user-content/auction.service';

@NgModule({
  declarations: [
    AppComponent,
    EnterComponent,
    UserContentComponent,
    StatsComponent,
    InventoryComponent,
    AuctionComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule
  ],
  providers: [
    CurrentUserService,
    ContentAuthGuard,
    LoginAuthGuard,
    AuctionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
