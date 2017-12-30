import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { UserContentComponent } from './user-content.component';
import { StatsComponent } from './stats/stats.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AuctionComponent } from './auction/auction.component';
import { CurrentUserService } from '../current-user.service';
import { AuctionService } from './auction.service';

describe('UserContentComponent', () => {
  let component: UserContentComponent;
  let fixture: ComponentFixture<UserContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContentComponent, StatsComponent, NotificationsComponent,
      InventoryComponent, AuctionComponent ],
      imports: [FormsModule, RouterTestingModule, HttpModule],
      providers: [CurrentUserService, AuctionService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
