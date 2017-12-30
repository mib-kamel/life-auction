import { TestBed, inject } from '@angular/core/testing';

import { AuctionService } from './auction.service';
import { HttpModule } from '@angular/http';

describe('AuctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AuctionService]
    });
  });

  it('should be created', inject([AuctionService], (service: AuctionService) => {
    expect(service).toBeTruthy();
  }));
});
