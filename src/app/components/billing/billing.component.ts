import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Payment } from 'src/app/model/payment';
import { UserService } from 'src/app/services/user.service';

declare let paypal: any;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements AfterViewChecked, OnInit {
  payments: any = [];
  loading = true;
  userInfo: any;

  showSuccessAlert: boolean;
  message: string;

  private paymentInfo: Payment;

  addScript = false;
  paypalLoad = true;

  finalAmount: number;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AVuMPJvHolrciBTNHJZZ-b6Wp1AeTyuGWSWpFJZ4hy6mLkUXakOw42w2LH8YiikcYuHN-qJbjSiymPUx',
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // Do something when payment is successful.

        window.alert('Payment transaction completed!');

        console.log('Payment id:', payment.id);
        console.log('Payment time:', payment.create_time);
        console.log('Payment state:', payment.state);
        console.log('Payment method', payment.payer.payment_method);
        console.log('Payment successful', payment);

        this.paymentInfo = new Payment(
          payment.id,
          payment.payer.payment_method,
          payment.state,
          this.finalAmount,
          payment.create_time,
          this.userInfo.uuid,
          this.userInfo.tenantId,
        );

        this.paymentService.submitPayment(this.paymentInfo).subscribe(() => {
          console.log(this.paymentInfo);
          this.showSuccessAlert = true;
          this.message = 'Payment Submitted Successfully!';
          setTimeout(() => {
            if (this.showSuccessAlert) {
              this.showSuccessAlert = false;
            }
          },
            2500);
        });
      });
    }
  };

  constructor(
    private userService: UserService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        console.log('returned user information:', data);
        this.userInfo = {
          uuid: data.user.uuid,
          tenantId: data.user.tenant.tenantId,
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
          ApartmentName: data.user.tenant.ApartmentName,
          House_No: data.user.tenant.House_No,
          rentBalance: data.user.tenant.rentBalance
        };
      }
    );
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
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
