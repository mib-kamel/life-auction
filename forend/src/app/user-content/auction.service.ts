import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

declare var io;

@Injectable()
export class AuctionService {

  constructor(private http: Http) { }

  bid(auctionID, bidValue, userID) {
    return this.http.post(`/api/auction/bid`, { auctionID, bidValue, userID });
  }


}
