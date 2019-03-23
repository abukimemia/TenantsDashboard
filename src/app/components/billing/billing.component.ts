import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  payments: any = [];
  loading = true;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;

    this.getUserPayments();
  }

  getUserPayments() {
    this.paymentService.getUserPayment().subscribe((data) => {
      this.payments = data;
      this.loading = false;
      console.log('user payments: ', this.payments);
    });
  }

}
