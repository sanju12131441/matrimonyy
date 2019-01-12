import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service'
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent  {

  constructor(private sub: SubscriptionService) {  }

  pay(amt,type)
  {
    let rzp = this.sub.payNowT(amt,type);
    rzp.open();
  }


}
