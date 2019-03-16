import { Component, OnInit, AfterViewChecked } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { PaymentService } from 'src/app/services/payment.service';

declare let paypal: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewChecked, OnInit {
  loggedInUser: string;
  userInfo: any;

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
        console.log('Payment successful', payment);
        this.paymentService.submitPayment(payment);
      });
    }
  };


  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.loggedInUser = this.tokenStorage.getUsername();
    }
    this.userService.getUserBoard().subscribe(
      data => {
        this.userInfo = {
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email
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


}
