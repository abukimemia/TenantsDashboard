import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedInUser: string;
  userInfo: any;
  propertyInfo: any = [];
  showSuccessAlert: boolean;
  message: string;

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.loggedInUser = this.tokenStorage.getUsername();
    }
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

}
