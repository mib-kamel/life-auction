import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { AuctionService } from '../auction.service';
import { CurrentUserService } from '../../current-user.service';

declare var io;

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html'
})
export class AuctionComponent implements OnInit {

  public bidValue: number;
  public auction: any;

  @Output() showNotification = new EventEmitter();

  constructor(private currentUserService: CurrentUserService,
    private auctionService: AuctionService,
    private zone: NgZone) { }

  forceUpdate() {
    this.zone.run(() => { });
  }

  socketEventSubscribtion() {
    const self = this;
    io.socket.on('auctions', function (event) {
      if (event.data.flag) {
        if (event.data.type === 1) {
          self.showNotification.emit({
            message: 'New auction started.',
            type: 'info'
          });
          io.socket.post('/api/auction/subscribe', function (msg) {
            self.auction = msg.auction;
            self.forceUpdate();
          });
        } else if (event.data.type === 2) {
          self.showNotification.emit({
            message: 'The current auction has ended.',
            type: 'info'
          });
          const auctionID = self.auction.id;
          io.socket.get(`/api/auction/unsubscribe/${auctionID}`, function (msg) { });
          self.auction = undefined;

          const user_name = self.currentUserService.getUser().user.user_name;
          self.currentUserService.enter(user_name)
            .subscribe(res => {
              if (res.user) {
                self.currentUserService.setCurrentUser(res);
              }
            });

          self.forceUpdate();
        }
      } else {
        if (event.data.type === 1) {
          self.auction.bestPrice = event.data.auction.bestPrice;
          self.auction.remaining = event.data.auction.remaining;
          self.forceUpdate();
        }
      }
    });
  }

  ngOnInit() {
    const self = this;
    this.socketEventSubscribtion();
    io.socket.post('/api/auction/flag', function (msg) {
      if (msg.auction) {
        self.auction = msg.auction;
        self.forceUpdate();
      }
    });
  }

  bidClick($event) {
    const user = this.currentUserService.getUser().user;
    if (!this.bidValue || this.auction.bestPrice >= this.bidValue) {
      if (this.auction.bestPrice < this.auction.minPrice) {
        this.showNotification.emit({
          message: 'You must enter a bid value more than or equal the min price.',
          type: 'error'
        });
      } else {
        this.showNotification.emit({
          message: 'You must enter a bid value more than winning price.',
          type: 'error'
        });
      }
    } else if (user.coins < this.bidValue) {
      this.showNotification.emit({
        message: `You only have ${user.coins} coins.`,
        type: 'error'
      });
    } else {
      this.auctionService.bid(this.auction.id, this.bidValue, user.id)
        .subscribe((res) => {
          if (res.json().message === 'done') {
            this.showNotification.emit({
              message: 'Congratulation, you set the best price until now.',
              type: 'info'
            });
          }
        });
    }
  }

}
