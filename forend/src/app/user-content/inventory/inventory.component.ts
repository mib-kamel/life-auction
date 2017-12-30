import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { CurrentUserService } from '../../current-user.service';
import { isNumber } from 'util';
import { AuctionService } from '../auction.service';

declare var io;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {

  public userInv: any;

  @Output() showNotification = new EventEmitter();

  constructor(private currentUserService: CurrentUserService,
    private auctionService: AuctionService,
    private zone: NgZone) { }

  forceUpdate() {
    this.zone.run(() => { });
  }

  ngOnInit() {
    this.userInv = this.currentUserService.getUser().userInv
      .map(item => {
        item.inPreSell = false;
        item.toSellQuan = '';
        item.toSellPrice = '';
        return item;
      });

    this.currentUserService.getCurrentUser().subscribe(curUser => {
      this.userInv = curUser.userInv
        .map(item => {
          item.inPreSell = false;
          item.toSellQuan = '';
          item.toSellPrice = '';
          return item;
        });
      this.forceUpdate();
    });
  }

  auctionClick(item) {
    item.inPreSell = true;
  }

  cancelPreSell(item) {
    item.inPreSell = false;
    item.toSellQuan = '';
    item.toSellPrice = '';
  }

  startSell(item) {
    let ret = false;
    item.toSellQuan = Number(item.toSellQuan);
    item.toSellPrice = Number(item.toSellPrice);

    if (Number(item.toSellQuan) !== Number(item.toSellQuan)
      || item.toSellQuan === 0) {
      item.toSellQuan = '';
      this.showNotification.emit({
        message: `Please enter a valid value of the quantity you want to sell.`,
        type: 'error'
      });
      ret = true;
    }

    if (Number(item.toSellPrice) !== Number(item.toSellPrice)
      || item.toSellPrice === 0) {
      item.toSellPrice = '';
      this.showNotification.emit({
        message: `Please enter a valid value of the start price.`,
        type: 'error'
      });
      ret = true;
    }

    if (ret) { return; }

    if (isNumber(item.toSellQuan) && item.toSellQuan > item.quantity) {
      this.showNotification.emit({
        message: `Cannot sell ${item.toSellQuan} of ${item.itemID.item_name} while you have only ${item.quantity}.`,
        type: 'error'
      });
      return;
    }

    const curUser = this.currentUserService.getUser().user;

    const auction = {
      userItemID: item.id,
      sellerName: curUser.user_name,
      sellerID: curUser.id,
      itemName: item.itemID.item_name,
      itemImage: item.itemID.img,
      quantity: item.toSellQuan,
      startPrice: item.toSellPrice,
      winnerID: curUser.id
    };

    const newQuantity = Number(item.quantity) - Number(item.toSellQuan);

    const self = this;
    io.socket.post('/api/auction/create', auction, function (msg) {
      self.showNotification.emit(msg);
      item.quantity = newQuantity;
      self.forceUpdate();
    });

    item.inPreSell = false;
    item.toSellQuan = '';
    item.toSellPrice = '';
  }

}
